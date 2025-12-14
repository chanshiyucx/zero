import type { Element, Root } from 'hast'
import type { MdxJsxAttribute } from 'mdast-util-mdx'
import type { Plugin } from 'unified'
import { SKIP, visit } from 'unist-util-visit'

export const rehypeAudio: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return
      if (node.name !== 'audio') return

      const props: Record<string, string | boolean> = {}
      for (const attr of node.attributes as MdxJsxAttribute[]) {
        props[attr.name] = attr.value === null ? true : (attr.value as string)
      }

      const audioNode: Element = {
        type: 'element',
        tagName: 'audio',
        properties: props,
        children: [],
      }

      parent.children.splice(index, 1, audioNode)
      return [SKIP, index]
    })
  }
}
