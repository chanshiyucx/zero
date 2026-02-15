import path from 'path'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import GithubSlugger from 'github-slugger'
import { z } from 'zod'
import { getOptions } from './lib/mdx'

const FILENAME_REGEX = /^(\d+)-(.+)\.md$/
const slugger = new GithubSlugger()

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
      date: z
        .string()
        .transform((value) => value.replace(' ', 'T'))
        .refine((value) => !isNaN(new Date(value).getTime()), {
          message: 'Invalid datetime format or invalid date value.',
        }),
      tags: z.string().array(),
      description: z.string().optional(),
      priority: z.number().default(0),
      content: z.string(),
    }),
    transform: async (document, context) => {
      const options = getOptions(name)
      const title = document.title
      const match = FILENAME_REGEX.exec(document._meta.fileName)
      if (!match) {
        throw new Error(
          `Invalid filename format: ${document._meta.fileName}. Expected format: <number>-<name>.md`,
        )
      }
      const [, no] = match

      const slug = slugger.slug(title)
      const url = path.join('/', name, slug)
      const contentCode = await compileMDX(context, document, options)

      const toc =
        (
          document._meta as {
            toc?: { id: string; title: string; depth: number }[]
          }
        ).toc ?? []

      return {
        ...document,
        no,
        slug,
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
