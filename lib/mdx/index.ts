import type { Options } from '@content-collections/mdx'
import type { Root as HastRoot } from 'hast'
import type { Root as MdastRoot } from 'mdast'
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
import { unified, type Pluggable, type Processor } from 'unified'
import { rehypeCallout } from './rehype-callout'
import { rehypeCode } from './rehype-code'
import { rehypeImageAlbum, rehypeImageSize } from './rehype-image'
import { rehypeToc } from './rehype-toc'

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
  rehypeImageAlbum,
  rehypeCallout,
  rehypeToc,
]

const optionsCache = new Map<string, Options>()

export const getOptions = (contentType: string): Options => {
  if (!optionsCache.has(contentType)) {
    optionsCache.set(contentType, {
      remarkPlugins,
      rehypePlugins: getRehypePlugins(contentType),
    })
  }
  return optionsCache.get(contentType)!
}
const processorCache = new Map<
  string,
  Processor<MdastRoot, MdastRoot, HastRoot, HastRoot, string>
>()

export const getMdxToHtmlProcessor = (contentType: string) => {
  if (!processorCache.has(contentType)) {
    const processor = unified()
      .use(remarkParse)
      .use(remarkPlugins)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(getRehypePlugins(contentType).filter((p) => p !== rehypeToc))
      .use(rehypeStringify, { allowDangerousHtml: true })
    processorCache.set(contentType, processor)
  }

  return processorCache.get(contentType)!
}
