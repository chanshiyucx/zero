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

const rehypeImage: Plugin<[Options?], Root> = (options) => {
  return (tree) => {
    visit(tree, { type: 'element', tagName: 'img' }, (node: Element) => {
      if (!node.properties || typeof node.properties.src !== 'string') return
      const imageSrc = path.join('/blog/posts/', node.properties.src)
      const imageSize = calcImageSize(imageSrc, options)
      node.properties.src = imageSrc
      node.properties.width = imageSize.width
      node.properties.height = imageSize.height
    })

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined) return
      const match = node.value.match(/^!\[\[(.+?)\]\]$/)
      if (!match) return

      const imageName = match[1]
      const imageSrc = path.join('/blog/posts/static/', imageName)
      const imageSize = calcImageSize(imageSrc, options)
      const imgNode: Element = {
        type: 'element',
        tagName: 'img',
        properties: {
          src: imageSrc,
          width: imageSize.width,
          height: imageSize.height,
        },
        children: [],
      }
      parent.children.splice(index, 1, imgNode)
    })
  }
}

export default rehypeImage
