import { defineDocumentType, makeSource } from '@contentlayer/source-files'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkExternalLinks from 'remark-external-links'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.md',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (weekly) => weekly._raw.sourceFileDir.replace('posts/', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
    remarkPlugins: [remarkGfm, remarkExternalLinks],
  },
})
