import { type Metadata } from 'next'
import { List } from '@/components/ui/list'
import { groupByYear, sortedArticles } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Posts',
  description:
    'A collection of my personal posts and thoughts on a variety of topics I enjoy, with a focus on technology.',
  keywords: ['blog', 'posts', 'thoughts', 'technical', 'tutorials'],
}

export default function Page() {
  const groupList = groupByYear(sortedArticles)

  return <List title="Life is a burning chaos." groups={groupList} />
}
