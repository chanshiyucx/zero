import path from 'path'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import GithubSlugger from 'github-slugger'
import { z } from 'zod'
import { getOptions } from './lib/mdx'
import type { TocEntry } from './lib/mdx/rehype-toc'

const FILENAME_REGEX = /^(?<no>\d+)-(?<name>.+)\.md$/

const getCollection = <T extends string>({
  name,
  directory,
}: {
  name: T
  directory: string
}) =>
  defineCollection({
    name,
    directory,
    include: '**/*.md',
    schema: z.object({
      type: z.literal(name).default(name),
      title: z.string(),
      date: z.string().transform((value) => {
        const isoValue = value.replace(' ', 'T')
        if (Number.isNaN(Date.parse(isoValue))) {
          throw new Error(`Invalid datetime format: ${value}`)
        }
        return isoValue
      }),
      tags: z.array(z.string()).default([]),
      description: z.string().optional(),
      content: z.string(),
    }),
    transform: async (document, context) => {
      const options = getOptions(name)
      const title = document.title

      const match = FILENAME_REGEX.exec(document._meta.fileName)
      if (!match?.groups) {
        throw new Error(
          `Invalid filename format: ${document._meta.fileName}. Expected format: <number>-<name>.md`,
        )
      }
      const { no } = match.groups

      const slugger = new GithubSlugger()
      const documentSlug = slugger.slug(title)
      const url = path.posix.join('/', name, documentSlug)

      const contentCode = await compileMDX(context, document, options)

      const toc = (document._meta as unknown as { toc?: TocEntry[] }).toc ?? []

      return {
        ...document,
        no,
        slug: documentSlug,
        url,
        toc,
        contentCode,
      }
    },
  })

const collections = [
  getCollection({
    name: 'album',
    directory: 'public/blog/album',
  }),
  getCollection({
    name: 'craft',
    directory: 'public/blog/craft',
  }),
  getCollection({
    name: 'journal',
    directory: 'public/blog/journal',
  }),
  getCollection({
    name: 'musing',
    directory: 'public/blog/musing',
  }),
]

export default defineConfig({
  collections,
})
