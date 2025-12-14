import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const rehypeCallout: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, { type: 'element', tagName: 'blockquote' }, (node: Element) => {
      const targetIndex = node.children.findIndex((child) => {
        if (child.type !== 'element' || child.tagName !== 'p') return false
        const firstChild = child.children[0]
        return firstChild?.type === 'text' && /^\[!.+?\]/.test(firstChild.value)
      })

      if (targetIndex !== -1) {
        node.children.splice(targetIndex, 1)
      }
    })
  }
}
