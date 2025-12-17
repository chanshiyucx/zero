import path from 'path'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX, type Options } from '@content-collections/mdx'
import dayjs from 'dayjs'
import GithubSlugger from 'github-slugger'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified, type Pluggable } from 'unified'
import { z } from 'zod'
import { isProd } from '@/lib/utils/env'
import {
  rehypeAudio,
  rehypeCallout,
  rehypeCode,
  rehypeImageGallery,
  rehypeImageSize,
  rehypeToc,
} from './lib/mdx'

const HTML_TAG_REGEX = /<[^>]*>/g
const PARAGRAPH_SPLIT_REGEX = /\r?\n\s*\r?\n/
const FILENAME_REGEX = /^(\d+)-(.+)\.md$/

const slugger = new GithubSlugger()

const remarkPlugins: Pluggable[] = [remarkGfm, remarkBreaks, remarkMath]

const getRehypePlugins = (contentType: string): Pluggable[] => [
  rehypeSlug,
  [rehypeKatex, { output: 'html' }],
  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
  [
    rehypeExternalLinks,
    { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] },
  ],
  rehypeCode,
  [
    rehypePrettyCode,
    {
      theme: {
        light: 'rose-pine-dawn',
        dark: 'rose-pine-moon',
      },
    },
  ],
  [rehypeImageSize, { root: 'public', contentType }],
  rehypeImageGallery,
  rehypeAudio,
  rehypeCallout,
  rehypeToc,
]

// Cache options to avoid repeated plugin array creation
const optionsCache = new Map<string, Options>()

const getOptions = (contentType: string): Options => {
  if (!optionsCache.has(contentType)) {
    optionsCache.set(contentType, {
      remarkPlugins,
      rehypePlugins: getRehypePlugins(contentType),
    })
  }
  return optionsCache.get(contentType)!
}

const getMdxToHtmlProcessor = (contentType: string) =>
  unified()
    .use(remarkParse)
    .use(remarkPlugins)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(getRehypePlugins(contentType).filter((p) => p !== rehypeToc))
    .use(rehypeStringify, { allowDangerousHtml: true })

const stripHtml = (html: string): string => html.replace(HTML_TAG_REGEX, '')

const extractDescription = (content: string): string => {
  const paragraphs = content.trim().split(PARAGRAPH_SPLIT_REGEX).filter(Boolean)

  for (const p of paragraphs) {
    const trimmedParagraph = p.trim()
    if (trimmedParagraph.startsWith('#')) continue

    const textContent = stripHtml(trimmedParagraph).trim()
    if (textContent) return textContent
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
        .refine((value) => dayjs(value, 'yyyy-MM-dd HH:mm:ss').isValid(), {
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

      // rss feed only for production
      const contentHtml = isProd
        ? String(await getMdxToHtmlProcessor(name).process(document.content))
        : ''

      const toc =
        (
          document._meta as {
            toc?: { id: string; title: string; depth: number }[]
          }
        ).toc ?? []
      // console.log('toc:', toc)

      return {
        ...document,
        no,
        slug,
        url,
        toc,
        description,
        descriptionCode,
        contentCode,
        contentHtml,
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
