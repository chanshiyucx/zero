import type { Element, Root } from 'hast'
import { toString } from 'hast-util-to-string'
import { visit } from 'unist-util-visit'

export type TocEntry = {
  id: string
  title: string
  depth: number
}

export const extractToc = (tree: Root, headings = ['h2', 'h3']) => {
  const toc: TocEntry[] = []

  visit(tree, 'element', (node: Element) => {
    if (!headings.includes(node.tagName) || !node.properties?.id) return

    const depth = Number(node.tagName.charAt(1))
    toc.push({
      id: String(node.properties.id),
      title: toString(node),
      depth,
    })
  })

  return toc
}
