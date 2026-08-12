import path from 'path'
import type { Element, Root } from 'hast'
import { imageSizeFromFile } from 'image-size/fromFile'
import type { Plugin } from 'unified'
import { SKIP, visit } from 'unist-util-visit'

type Options = {
  root?: string
  contentType: string
}

const calcImageSize = async (imageSrc: string, options?: Options) => {
  const imagePath = path.join(options?.root ?? '', imageSrc)
  try {
    const dimensions = await imageSizeFromFile(imagePath)
    return { width: dimensions.width, height: dimensions.height }
  } catch (error) {
    console.error(`Failed to get image size for ${imagePath}`, error)
    return { width: 0, height: 0 }
  }
}

const replaceExtensionWithWebp = (pathname: string) =>
  pathname.replace(/\.[^/.]+$/, '.webp')

const thumbnailPathTransformers: Record<
  string,
  (pathname: string) => string | null
> = {
  // https://cloud.shiyu.me/gallery/example.avif → https://cloud.shiyu.me/thumbnails/example.webp
  'cloud.shiyu.me': (pathname) => {
    if (!pathname.startsWith('/gallery/')) return null
    return replaceExtensionWithWebp(
      pathname.replace(/^\/gallery\//, '/thumbnails/'),
    )
  },
  // https://assets.shiyu.me/musing/example.jpg → https://assets.shiyu.me/musing/example.webp
  'assets.shiyu.me': replaceExtensionWithWebp,
}

const getThumbnail = (src: string) => {
  try {
    const url = new URL(src)
    const transformPathname = thumbnailPathTransformers[url.hostname]
    if (!transformPathname) return null

    const pathname = transformPathname(url.pathname)
    if (!pathname) return null

    url.pathname = pathname
    return url.toString()
  } catch {
    return null
  }
}

export const rehypeImageSize: Plugin<[Options], Root> = (options) => {
  return async (tree) => {
    const imageNodes: Element[] = []

    // Calculate image size
    visit(tree, { type: 'element', tagName: 'img' }, (node: Element) => {
      if (!node.properties || typeof node.properties.src !== 'string') return
      if (/^https?:\/\//.test(node.properties.src)) {
        const thumbnail = getThumbnail(node.properties.src)
        // Only images hosted on a configured R2 bucket have thumbnails.
        if (!thumbnail) return

        node.properties.originalsrc = node.properties.src
        node.properties.src = thumbnail
        node.properties.width = 300
        node.properties.height = 200
      } else {
        // Wiki image
        const imageSrc = path.join(
          '/blog',
          options.contentType,
          node.properties.src,
        )
        node.properties.src = imageSrc
        imageNodes.push(node)
      }
    })

    // Wiki image will be recognized as text
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return
      const match = /^!\[\[(.+?)\]\]$/.exec(node.value)
      if (!match) return
      // Only wiki image can be executed here.
      const imageName = match[1]
      if (!imageName) return
      const imageSrc = path.join(
        '/blog',
        options.contentType,
        'static',
        imageName,
      )
      const alt = path
        .basename(imageName, path.extname(imageName))
        .replace(/-/g, ' ')
      const imgNode: Element = {
        type: 'element',
        tagName: 'img',
        properties: {
          src: imageSrc,
          alt,
        },
        children: [],
      }
      imageNodes.push(imgNode)
      parent.children.splice(index, 1, imgNode)
      return [SKIP, index]
    })

    await Promise.all(
      imageNodes.map(async (node) => {
        const imageSize = await calcImageSize(
          node.properties.src as string,
          options,
        )
        node.properties.width = imageSize.width
        node.properties.height = imageSize.height
      }),
    )
  }
}

export const rehypeImageGallery: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, { type: 'element', tagName: 'p' }, (node, index, parent) => {
      if (!parent || typeof index !== 'number') return

      const isGalleryParagraph = node.children.every(
        (child) =>
          (child.type === 'element' &&
            (child.tagName === 'img' || child.tagName === 'br')) ||
          (child.type === 'text' &&
            (child.value.trim() === '' || child.value.trim() === '\n')),
      )
      if (!isGalleryParagraph) return

      const imageNodes = node.children.filter(
        (child) => child.type === 'element' && child.tagName === 'img',
      )
      if (imageNodes.length === 0) return

      const galleryNode: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['photo-gallery'],
          dataTotal: imageNodes.length,
        },
        children: imageNodes,
      }
      parent.children.splice(index, 1, galleryNode)
      return [SKIP, index]
    })
  }
}
