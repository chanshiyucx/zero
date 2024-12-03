import path from 'path'
import type { Options } from '@content-collections/mdx'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { isValid, parse } from 'date-fns'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { rehypeCodeSave, rehypeImage } from './lib/mdx'

interface CollectionProps {
  name: string
  directory: string
  prefixPath: string
}

const options: Options = {
  rehypePlugins: [
    [rehypeExternalLinks, { rel: ['nofollow'] }],
    [rehypeCodeSave],
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
  ],
  remarkPlugins: [remarkGfm],
}

const getCollection = ({ name, directory, prefixPath }: CollectionProps) =>
  defineCollection({
    name,
    directory,
    include: '**/*.md',
    schema: (z) => ({
      title: z.string(),
      date: z.string().refine(
        (value) => {
          const date = parse(value, 'yyyy-MM-dd HH:mm:ss', new Date())
          return isValid(date)
        },
        {
          message: 'Invalid datetime format or invalid date value.',
        },
      ),
      tags: z.string().array(),
      description: z.string().optional(),
    }),
    transform: async (document, context) => {
      const match = document._meta.fileName.match(/^(\d+)-(.+)\.md$/)!
      const id = match[1]
      const slug = match[2]
      const url = path.join(prefixPath, slug)
      const contentCode = await compileMDX(context, document, options)

      return {
        ...document,
        id,
        slug,
        url,
        contentCode,
      }
    },
  })

const posts = getCollection({
  name: 'posts',
  directory: 'public/blog/posts',
  prefixPath: '/posts',
})

const leetcode = getCollection({
  name: 'leetcode',
  directory: 'public/blog/leetcode',
  prefixPath: '/leetcode',
})

export default defineConfig({
  collections: [posts, leetcode],
})
