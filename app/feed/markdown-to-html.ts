import rehypeStringify from 'rehype-stringify'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export function markdownToHtml(markdown: string) {
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdown)
  return String(file)
}
