import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { toString } from 'hast-util-to-string'
import { visit } from 'unist-util-visit'

interface Options {
  headings?: string[]
}

export interface TocEntry {
  id: string
  title: string
  depth: number
}

export const tocCache = new WeakMap()

export const rehypeToc: Plugin<[Options?], Root> = (options = {}) => {
  const { headings = ['h2', 'h3'] } = options

  return (tree, file) => {
    const toc: TocEntry[] = []

    visit(tree, 'element', (node: Element) => {
      if (!headings.includes(node.tagName) || !node.properties?.id) return

      const depth = parseInt(node.tagName.charAt(1))
      toc.push({
        id: node.properties.id as string,
        title: toString(node),
        depth,
      })
    })

    if (file.data._meta) {
      tocCache.set(file.data._meta, toc)
    }
  }
}
