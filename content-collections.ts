import path from 'path'
import type { Options } from '@content-collections/mdx'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
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
import { rehypeCodeSave, rehypeImage, rehypeToc } from './lib/mdx'
import { tocCache } from './lib/mdx/rehype-toc'

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
    rehypeToc,
  ],
  remarkPlugins: [remarkGfm, remarkBreaks, remarkMath],
}

const getCollection = ({ name, directory, prefixPath }: CollectionProps) =>
  defineCollection({
    name,
    directory,
    include: '**/*.md',
    schema: (z) => ({
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
      const match = document._meta.fileName.match(/^(\d+)-(.+)\.md$/)!
      const [, id, title] = match
      const slug = slugger.slug(title)
      const url = path.join(prefixPath, slug)
      const contentCode = await compileMDX(context, document, options)
      const toc = tocCache.get(document._meta) ?? []

      return {
        ...document,
        id,
        slug,
        url,
        contentCode,
        toc,
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
  prefixPath: '/leetcode',
})

const album = getCollection({
  name: 'album',
  directory: 'public/blog/album',
  prefixPath: '/album',
})

export default defineConfig({
  collections: [posts, notes, leetcode, album],
})
