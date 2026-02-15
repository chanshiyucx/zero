import type { Metadata } from 'next'
import { LinkList } from '@/components/list'
import { groupByYear, sortedCrafts } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Craft',
  description:
    'A collection of my personal posts and thoughts on a variety of topics I enjoy, with a focus on technology.',
  keywords: ['blog', 'posts', 'thoughts', 'technical', 'tutorials', 'craft'],
}

export default function Page() {
  const groupList = groupByYear(sortedCrafts)

  return <LinkList title="Tech ignites boundless sparks." groups={groupList} />
}
