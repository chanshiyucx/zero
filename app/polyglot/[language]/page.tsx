import type { Polyglot } from 'content-collections'
import type { Metadata } from 'next'
import { List, type ExtraInfo } from '@/components/ui/list'
import { groupByYear, sortedPolyglots } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Polyglot',
  description:
    'My learning journey and insights in English and German languages. Here I document my progress, experiences, and reflections on language learning.',
  keywords: ['polyglot', 'english', 'german'],
}

interface PageProps {
  params: Promise<{ language: 'english' | 'german' }>
}

const colors = {
  Writing: 'text-foam',
  Reading: 'text-gold',
  Listening: 'text-love',
} as const

const title = {
  english: 'English writing sharpens thinking.',
  german: 'Deutsch ist ein Fenster weiter.',
} as const

const extractInfo = (article: Polyglot): ExtraInfo => {
  const tag = article.tags[0].split('/')[1] as keyof typeof colors
  return {
    color: colors[tag],
    text: tag,
  }
}

export default async function Page({ params }: PageProps) {
  const { language } = await params
  const polyglotList = sortedPolyglots(language)
  const polyglotGroupList = groupByYear(polyglotList)

  return (
    <List
      title={title[language]}
      groups={polyglotGroupList}
      extractInfo={extractInfo}
    />
  )
}
