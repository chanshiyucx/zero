import path from 'path'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX, type Options } from '@content-collections/mdx'
import { isValid, parse } from 'date-fns'
import GithubSlugger from 'github-slugger'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { z } from 'zod'
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

const options: Options = {
  rehypePlugins: [
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
  ],
  remarkPlugins: [remarkGfm, remarkBreaks, remarkMath],
}

function extractLanguageSections(content: string) {
  const parts = content
    .split(/^##\s+/gm)
    .filter(Boolean)
    .map((section) => {
      const lines = section.split('\n')
      const title = lines.shift()!
      const content = lines.join('\n').trim()
      return { title, content }
    })

  return {
    de: parts[0],
    en: parts[1],
  }
}

const getCollection = ({ name, directory, prefixPath }: CollectionProps) =>
  defineCollection({
    name,
    directory,
    include: '**/*.md',
    schema: z.object({
      title: z.string(),
      date: z
        .string()
        .refine(
          (value) => isValid(parse(value, 'yyyy-MM-dd HH:mm:ss', new Date())),
          { message: 'Invalid datetime format or invalid date value.' },
        ),
      tags: z.string().array(),
      description: z.string().optional(),
      priority: z.number().default(0),
      level: z.enum(['Easy', 'Medium', 'Hard']).optional(), // Only for leetcode
    }),
    transform: async (document, context) => {
      const title = document.title
      const match = document._meta.fileName.match(/^(\d+)-(.+)\.md$/)!
      const [, no] = match
      const slug = slugger.slug(title)
      const contentCode = { en: '', de: '' }
      const titleCode = { en: '', de: '' }

      const isPolyglot = prefixPath === '/polyglot'
      // handle polyglot url
      let url = ''
      if (isPolyglot) {
        const language = document.tags[0].split('/')[0].toLowerCase()
        url = path.join(prefixPath, language, slug)
      } else {
        url = path.join(prefixPath, slug)
      }

      // only German writing is currently bilingual
      const isGermanWriting =
        isPolyglot && document.tags.some((e) => e === 'German/Writing')
      if (isGermanWriting) {
        const sections = extractLanguageSections(document.content)
        contentCode.de = await compileMDX(
          context,
          { ...document, content: sections.de.content },
          options,
        )
        contentCode.en = await compileMDX(
          context,
          {
            ...document,
            content: sections.en.content,
          },
          options,
        )
        titleCode.de = sections.de.title
        titleCode.en = sections.en.title
      } else {
        contentCode.en = await compileMDX(context, document, options)
        titleCode.en = title
      }

      // @ts-expect-error: toc injected at runtime and is not typed in Meta
      // lib/mdx/rehype-toc.ts
      // Dev mode may not have TOC because the caching mechanism doesn't rerun remarkPlugins and rehypePlugins.
      const toc = document._meta?.toc ?? []

      return {
        ...document,
        no,
        slug,
        url,
        toc,
        contentCode,
        titleCode,
      }
    },
  })

const collectionConfigs: CollectionProps[] = [
  {
    name: 'posts',
    directory: 'public/blog/posts',
    prefixPath: '/blog/posts',
  },
  {
    name: 'notes',
    directory: 'public/blog/notes',
    prefixPath: '/blog/notes',
  },
  {
    name: 'leetcode',
    directory: 'public/blog/leetcode',
    prefixPath: '/blog/leetcode',
  },
  {
    name: 'album',
    directory: 'public/blog/album',
    prefixPath: '/album',
  },
  {
    name: 'polyglot',
    directory: 'public/blog/polyglot',
    prefixPath: '/polyglot',
  },
] as const

const collections = collectionConfigs.map(getCollection)

export default defineConfig({
  collections,
})
