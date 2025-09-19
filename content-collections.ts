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

interface CollectionProps {
  name: string
  directory: string
  prefixPath: string
}

const slugger = new GithubSlugger()

const remarkPlugins: Pluggable[] = [remarkGfm, remarkBreaks, remarkMath]

const rehypePlugins: Pluggable[] = [
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
  [rehypeImageSize, { root: 'public' }],
  rehypeImageGallery,
  rehypeAudio,
  rehypeCallout,
  rehypeToc,
]

const options: Options = {
  remarkPlugins,
  rehypePlugins,
}

const mdxToHtmlProcessor = unified()
  .use(remarkParse)
  .use(remarkPlugins)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypePlugins.filter((p) => p !== rehypeToc))
  .use(rehypeStringify, { allowDangerousHtml: true })

const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, '')

const extractDescription = (content: string): string => {
  const paragraphs = content
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .filter(Boolean)

  for (const p of paragraphs) {
    const trimmedParagraph = p.trim()
    if (trimmedParagraph.startsWith('#')) {
      continue
    }

    const textContent = stripHtml(trimmedParagraph).trim()
    if (textContent) {
      return textContent
    }
  }

  return ''
}

const getCollection = ({ name, directory, prefixPath }: CollectionProps) =>
  defineCollection({
    name,
    directory,
    include: '**/*.md',
    schema: z.object({
      type: z.string().default(name),
      title: z.string(),
      date: z
        .string()
        .refine((value) => dayjs(value, 'yyyy-MM-dd HH:mm:ss').isValid(), {
          message: 'Invalid datetime format or invalid date value.',
        }),
      tags: z.string().array(),
      description: z.string().optional(),
      priority: z.number().default(0),
      level: z.enum(['Easy', 'Medium', 'Hard']).optional(), // Only for leetcode
    }),
    transform: async (document, context) => {
      const title = document.title
      const description =
        document.description ?? extractDescription(document.content)
      const descriptionCode = await compileMDX(
        context,
        { ...document, content: description },
        options,
      )

      const match = document._meta.fileName.match(/^(\d+)-(.+)\.md$/)!
      const [, no] = match
      const slug = slugger.slug(title)
      const url = path.join(prefixPath, slug)
      const contentCode = await compileMDX(context, document, options)

      // rss feed only for production
      const contentHtml = isProd
        ? String(await mdxToHtmlProcessor.process(document.content))
        : ''

      // @ts-expect-error: toc injected at runtime and is not typed in Meta
      // lib/mdx/rehype-toc.ts
      // Dev mode may not have TOC because the caching mechanism doesn't rerun remarkPlugins and rehypePlugins.
      const toc = document._meta?.toc ?? []
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

const collectionConfigs: CollectionProps[] = [
  {
    name: 'post',
    directory: 'public/blog/posts',
    prefixPath: '/posts',
  },
  {
    name: 'snippet',
    directory: 'public/blog/snippets',
    prefixPath: '/snippets',
  },
  {
    name: 'leetcode',
    directory: 'public/blog/leetcode',
    prefixPath: '/leetcode',
  },
  {
    name: 'vibe',
    directory: 'public/blog/vibes',
    prefixPath: '/vibes',
  },
  {
    name: 'album',
    directory: 'public/blog/album',
    prefixPath: '/album',
  },
]

const collections = collectionConfigs.map(getCollection)

export default defineConfig({
  collections,
})
