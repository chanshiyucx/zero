import { type Metadata } from 'next'
import { List } from '@/components/ui/list'
import { groupByYear, sortedPosts } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Posts',
  description:
    'A collection of my personal posts and thoughts on a variety of topics I enjoy, with a focus on technology.',
  keywords: ['blog', 'posts', 'thoughts', 'technical', 'tutorials'],
}

export default function Page() {
  const postList = sortedPosts()
  const postGroupList = groupByYear(postList)

  return <List title="Life is a burning chaos." groups={postGroupList} />
}
