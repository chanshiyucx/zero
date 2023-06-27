import type { Plugin } from 'unified'
import { Element, Root } from 'hast'
import getImageSize from 'image-size'
import { visit } from 'unist-util-visit'

type Options = Partial<{
  /** Images root directory. Used to build the path for each image `(path = root + image.src`). */
  root: string
}>

const rehypeImageSizes: Plugin<[Options?], Root> = (options) => {
  return (tree) => {
    visit(tree, { type: 'element', tagName: 'img' }, (node: Element) => {
      if (!node.properties || typeof node.properties.src !== 'string') {
        return
      }

      const imagePath = decodeURI(`${options?.root ?? ''}${node.properties.src}`)
      const imageSize = getImageSize(imagePath)
      node.properties.width = imageSize.width
      node.properties.height = imageSize.height
    })
  }
}

export default rehypeImageSizes
