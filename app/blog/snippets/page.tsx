import { type Snippet } from 'content-collections'
import { type Metadata } from 'next'
import { List } from '@/components/ui/list'
import { groupByYear, sortedSnippets } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Snippets',
  description: 'A collection of snippets on things I have learned recently.',
  keywords: ['blog', 'snippets', 'learn', 'study', 'skills', 'code'],
}

const colors = {
  JavaScript: 'text-love',
  CSS: 'text-gold',
  React: 'text-foam',
  Vue: 'text-iris',
} as const

const extractInfo = (article: Snippet) => {
  const lastTag = article.tags.at(-1)
  const meta = lastTag?.split('/') ?? []
  const category = meta[0] as keyof typeof colors

  return {
    className: `${colors[category]} w-20`,
    text: meta[0],
  }
}

export default function Page() {
  const snippetList = sortedSnippets
  const snippetGroupList = groupByYear(snippetList)

  return (
    <List
      title="Snippets are memory anchors."
      groups={snippetGroupList}
      extractInfo={extractInfo}
    />
  )
}
