import type { Metadata } from 'next'
import { ArticleList } from '@/components/list'
import { sortedMusings } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Musings',
  description:
    'A collection of thoughts and reflections from everyday moments.',
  keywords: ['blog', 'musings', 'thoughts', 'moments', 'fragments', 'life'],
}

export default function Page() {
  return (
    <ArticleList
      title="Feelings bloom into words."
      codeKey="contentCode"
      data={sortedMusings}
    />
  )
}
