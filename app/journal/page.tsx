import { type Metadata } from 'next'
import { List } from '@/components/ui/list'
import { groupByYear, sortedJournals } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'A collection of my personal posts and thoughts on a variety of topics I enjoy, with a focus on technology.',
  keywords: ['blog', 'posts', 'thoughts', 'technical', 'tutorials', 'journal'],
}

export default function Page() {
  const groupList = groupByYear(sortedJournals)

  return <List title="Life is a burning chaos." groups={groupList} />
}
