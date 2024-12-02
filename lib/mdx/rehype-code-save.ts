import type { Root } from 'hast'
import { visit } from 'unist-util-visit'

interface NodeChildren {
  type: string
  tagName: string
  properties: { className: string[] }
  children?: [{ type: string; value: string }]
  position: {
    start: { line: number; column: number; offset: number }
    end: { line: number; column: number; offset: number }
  }
}

export const rehypeCodeSave = () => (tree: Root) => {
  visit(tree, (node) => {
    if (node?.type === 'element' && node?.tagName === 'pre') {
      const [codeEl] = node.children as NodeChildren[]
      if (codeEl.tagName !== 'code') return
      node.properties.raw = codeEl.children?.[0].value
    }
  })
}
