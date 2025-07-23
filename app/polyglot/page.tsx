import type { ExtraInfo } from '@/components/ui/list'
import type { Polyglot } from 'content-collections'
import type { Metadata } from 'next'
import { List } from '@/components/ui/list'
import { groupByYear, sortedPolyglots } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Polyglot',
  description:
    'My learning journey and insights in English and German languages. Here I document my progress, experiences, and reflections on language learning.',
  keywords: ['polyglot', 'english', 'german'],
}

const colors = {
  German: 'text-foam',
  English: 'text-gold',
} as const

const extractInfo = (article: Polyglot): ExtraInfo => {
  const tag = article.tags[0].split('/')[0] as keyof typeof colors
  return {
    color: colors[tag],
    text: tag,
  }
}

export default async function Page() {
  const polyglotList = sortedPolyglots()
  const polyglotGroupList = groupByYear(polyglotList)

  return (
    <List
      title="Polyglots think beyond one world."
      groups={polyglotGroupList}
      extractInfo={extractInfo}
    />
  )
}
