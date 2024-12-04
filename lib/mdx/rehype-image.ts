import path from 'path'
import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import sizeOf from 'image-size'
import { visit } from 'unist-util-visit'

type Options = Partial<{
  root: string
}>

const calcImageSize = (imageSrc: string, options?: Options) => {
  const imagePath = path.join(options?.root ?? '', imageSrc)
  try {
    const dimensions = sizeOf(imagePath)
    return { width: dimensions.width, height: dimensions.height }
  } catch (err) {
    console.error(`Failed to get image size for ${imagePath}`, err)
    return { width: 0, height: 0 }
  }
}

const getThumbnail = (src: string) => {
  // from: https://cx-onedrive.pages.dev/api/raw?path=/长沙/DSC00069.JPG
  // to:   https://cx-onedrive.pages.dev/api/thumbnail?path=/长沙/DSC01999.JPG&size=medium
  return src.replace('/raw?', '/thumbnail?') + '&size=large'
}

export const rehypeImage: Plugin<[Options?], Root> = (options) => {
  return (tree) => {
    visit(tree, { type: 'element', tagName: 'img' }, (node: Element) => {
      if (!node.properties || typeof node.properties.src !== 'string') return
      if (node.properties.src.startsWith('http')) {
        // Onedrive image
        node.properties.originalsrc = node.properties.src
        node.properties.src = getThumbnail(node.properties.src)
        node.properties.width = 300
        node.properties.height = 200
      } else {
        // Wiki image
        const imageSrc = path.join('/blog/posts/', node.properties.src)
        const imageSize = calcImageSize(imageSrc, options)
        node.properties.src = imageSrc
        node.properties.width = imageSize.width
        node.properties.height = imageSize.height
      }
    })

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined) return
      const match = node.value.match(/^!\[\[(.+?)\]\]$/)
      if (!match) return
      // Only wiki image can be executed here.
      const imageName = match[1]
      const imageSrc = path.join('/blog/posts/static/', imageName)
      const imageSize = calcImageSize(imageSrc, options)
      const alt = path
        .basename(imageName, path.extname(imageName))
        .replace(/-/g, ' ')
      const imgNode: Element = {
        type: 'element',
        tagName: 'img',
        properties: {
          src: imageSrc,
          width: imageSize.width,
          height: imageSize.height,
          alt,
        },
        children: [],
      }
      parent.children.splice(index, 1, imgNode)
    })
  }
}
