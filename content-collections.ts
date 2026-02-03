import path from 'path'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import GithubSlugger from 'github-slugger'
import { z } from 'zod'
import { getOptions } from './lib/mdx'

const HTML_TAG_REGEX = /<[^>]*>/g
const PARAGRAPH_SPLIT_REGEX = /\r?\n\s*\r?\n/
const FILENAME_REGEX = /^(\d+)-(.+)\.md$/

const slugger = new GithubSlugger()

const stripHtml = (html: string): string => html.replace(HTML_TAG_REGEX, '')

const extractDescription = (content: string): string => {
  const paragraphs = content.trim().split(PARAGRAPH_SPLIT_REGEX)

  for (const p of paragraphs) {
    if (!p) continue
    const trimmed = p.trim()
    if (trimmed.startsWith('#')) continue

    const text = stripHtml(trimmed).trim()
    if (text) return text
  }

  return ''
}

const getCollection = <T extends string>({
  name,
  directory,
  prefixPath,
  compileDescription = false,
}: {
  name: T
  directory: string
  prefixPath: string
  compileDescription?: boolean
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
      const title = document.title
      const description =
        document.description ?? extractDescription(document.content)
      const options = getOptions(name)
      const descriptionCode = compileDescription
        ? await compileMDX(
            context,
            { ...document, content: description },
            options,
          )
        : ''

      const match = FILENAME_REGEX.exec(document._meta.fileName)
      if (!match) {
        throw new Error(
          `Invalid filename format: ${document._meta.fileName}. Expected format: <number>-<name>.md`,
        )
      }
      const [, no] = match

      const slug = slugger.slug(title)
      const url = path.join(prefixPath, slug)
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
        description,
        descriptionCode,
        contentCode,
      }
    },
  })

const collections = [
  getCollection({
    name: 'album',
    directory: 'public/blog/album',
    prefixPath: '/album',
  }),
  getCollection({
    name: 'article',
    directory: 'public/blog/article',
    prefixPath: '/articles',
  }),
  getCollection({
    name: 'journal',
    directory: 'public/blog/journal',
    prefixPath: '/journal',
  }),
  getCollection({
    name: 'snippet',
    directory: 'public/blog/snippet',
    prefixPath: '/snippets',
    compileDescription: true,
  }),
]

export default defineConfig({
  collections,
})
