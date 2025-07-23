import type { Meta } from '@content-collections/core'
import type { Element, Root } from 'hast'
import { toString } from 'hast-util-to-string'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

interface Options {
  headings?: string[]
}

export interface TocEntry {
  id: string
  title: string
  depth: number
}

interface MetaWithToc extends Meta {
  toc: TocEntry[]
}

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
    const meta = file.data._meta as MetaWithToc
    meta.toc = toc
  }
}
