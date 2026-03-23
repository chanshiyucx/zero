import type { Metadata } from 'next'
import { ArticleList } from '@/components/list'
import { sortedAlbums } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Album',
  description:
    'A collection of my photography, each image capturing a unique moment and emotion.',
  keywords: ['album', 'photo', 'photography', 'travel'],
}

export default function Page() {
  return <ArticleList title="Photography freezes time." data={sortedAlbums} />
}
