import path from 'path'
import type { Element, Root } from 'hast'
import { imageSizeFromFile } from 'image-size/fromFile'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

interface Options {
  root?: string
}

const calcImageSize = async (imageSrc: string, options?: Options) => {
  const imagePath = path.join(options?.root ?? '', imageSrc)
  try {
    const dimensions = await imageSizeFromFile(imagePath)
    return { width: dimensions.width, height: dimensions.height }
  } catch (err) {
    console.error(`Failed to get image size for ${imagePath}`, err)
    return { width: 0, height: 0 }
  }
}

// from: https://cx-onedrive.pages.dev/api/raw?path=/长沙/DSC00069.JPG
// to:   https://cx-onedrive.pages.dev/api/thumbnail?path=/长沙/DSC01999.JPG&size=medium
const getThumbnail = (src: string) =>
  src.replace('/raw?', '/thumbnail?') + '&size=large'

export const rehypeImage: Plugin<[Options?], Root> = (options) => {
  return async (tree) => {
    const imageNodes: Element[] = []

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
        node.properties.src = imageSrc
        imageNodes.push(node)
      }
    })

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined) return
      const match = node.value.match(/^!\[\[(.+?)\]\]$/)
      if (!match) return
      // Only wiki image can be executed here.
      const imageName = match[1]
      const imageSrc = path.join('/blog/posts/static/', imageName)
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
