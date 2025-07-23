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
  rehypeCallout,
  rehypeCodeSave,
  rehypeImage,
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
    rehypeCodeSave,
    [
      rehypePrettyCode,
      {
        theme: {
          light: 'rose-pine-dawn',
          dark: 'rose-pine-moon',
        },
      },
    ],
    [rehypeImage, { root: 'public' }],
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
      level: z.enum(['Easy', 'Medium', 'Hard']).optional(), // Only for leetcode
    }),
    transform: async (document, context) => {
      const title = document.title
      const match = document._meta.fileName.match(/^(\d+)-(.+)\.md$/)!
      const [, no] = match
      const slug = slugger.slug(title)
      const url = path.join(prefixPath, slug)
      const contentCode = { en: '', de: '' }
      const titleCode = { en: '', de: '' }

      // Only German writing is currently bilingual
      const isPolyglotDeutsch =
        prefixPath === '/polyglot' &&
        document.tags.some((e) => e === 'German/Writing')

      if (isPolyglotDeutsch) {
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

const posts = getCollection({
  name: 'posts',
  directory: 'public/blog/posts',
  prefixPath: '/blog/posts',
})

const notes = getCollection({
  name: 'notes',
  directory: 'public/blog/notes',
  prefixPath: '/blog/notes',
})

const leetcode = getCollection({
  name: 'leetcode',
  directory: 'public/blog/leetcode',
  prefixPath: '/blog/leetcode',
})

const album = getCollection({
  name: 'album',
  directory: 'public/blog/album',
  prefixPath: '/album',
})

const polyglot = getCollection({
  name: 'polyglot',
  directory: 'public/blog/polyglot/writing',
  prefixPath: '/polyglot',
})

const clippings = getCollection({
  name: 'clippings',
  directory: 'public/blog/polyglot/reading',
  prefixPath: '/clippings',
})

export default defineConfig({
  collections: [posts, notes, leetcode, album, polyglot, clippings],
})
