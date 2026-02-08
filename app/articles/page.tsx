import type { Metadata } from 'next'
import { LinkList } from '@/components/list'
import { groupByYear, sortedArticles } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'A collection of my personal posts and thoughts on a variety of topics I enjoy, with a focus on technology.',
  keywords: ['blog', 'posts', 'thoughts', 'technical', 'tutorials', 'articles'],
}

export default function Page() {
  const groupList = groupByYear(sortedArticles)

  return <LinkList title="Tech ignites boundless sparks." groups={groupList} />
}
