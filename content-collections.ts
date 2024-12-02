import type { Options } from '@content-collections/mdx'
import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { isValid, parse } from 'date-fns'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { rehypeCodeSave, rehypeImage } from './lib/mdx'

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

const posts = defineCollection({
  name: 'posts',
  directory: 'public/blog/posts',
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
    let description = document.description
    if (!description) {
      const result = /^[^\n]*/.exec(document.content)
      description = result ? result[0] : ''
    }

    const slug = document._meta.fileName.replace(/^(\d+-)|(.md)$/g, '')
    const url = `/posts/${slug}`
    const contentCode = await compileMDX(context, document, options)
    const descriptionCode = await compileMDX(
      context,
      { ...document, content: description },
      options,
    )

    return {
      ...document,
      slug,
      url,
      contentCode,
      description,
      descriptionCode,
    }
  },
})

export default defineConfig({
  collections: [posts],
})
