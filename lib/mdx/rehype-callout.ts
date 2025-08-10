import { type Element, type Root, type Text } from 'hast'
import { type Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const rehypeCallout: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, { type: 'element', tagName: 'blockquote' }, (node: Element) => {
      const targetIndex = node.children.findIndex((child) => {
        if (child.type !== 'element' || child.tagName !== 'p') return false
        const firstChild = child.children[0]
        return (
          firstChild &&
          firstChild.type === 'text' &&
          /^\[!.+?\]/.test((firstChild as Text).value)
        )
      })

      if (targetIndex !== -1) {
        node.children.splice(targetIndex, 1)
      }
    })
  }
}
