import type { Metadata } from 'next'
import { ArticleList } from '@/components/list'
import { sortedSnippets } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Snippets',
  description: 'A collection of snippets on things I have learned recently.',
  keywords: ['blog', 'snippets', 'learn', 'study', 'skills', 'code'],
}

export default function Page() {
  return (
    <ArticleList
      title="Snippets are memory anchors."
      codeKey="descriptionCode"
      data={sortedSnippets}
    />
  )
}
