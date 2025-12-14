import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

interface CodeElement extends Element {
  tagName: 'code'
  children: [{ type: 'text'; value: string }]
}

const isCodeElement = (node: Element): node is CodeElement =>
  node.tagName === 'code' &&
  Array.isArray(node.children) &&
  node.children.length === 1 &&
  node.children[0]?.type === 'text'

export const rehypeCode: Plugin<[], Root> = () => {
  return (tree) => {
    // code copy support
    visit(tree, { type: 'element', tagName: 'pre' }, (node: Element) => {
      const [codeEl] = node.children as Element[]
      if (!codeEl || !isCodeElement(codeEl)) return

      node.properties = node.properties || {}
      node.properties.raw = codeEl.children[0].value
      const className = codeEl.properties?.className as string[] | undefined
      const language = className?.[0]?.split('-')[1] ?? 'text'
      node.properties['data-language'] = language
    })

    // replace &nbsp with space
    visit(tree, 'text', (node) => {
      if (typeof node.value === 'string') {
        node.value = node.value.replace(/\u00A0/g, ' ')
      }
    })
  }
}
