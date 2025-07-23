import type { ExtraInfo } from '@/components/ui/list'
import type { Clipping } from 'content-collections'
import type { Metadata } from 'next'
import { List } from '@/components/ui/list'
import { groupByYear, sortedClippings } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Clippings',
  description: 'Clipped English and German articles from around the web.',
  keywords: ['clippings', 'english', 'german'],
}

const colors = {
  German: 'text-foam',
  English: 'text-gold',
} as const

const extractInfo = (article: Clipping): ExtraInfo => {
  const tag = article.tags[0].split('/')[0] as keyof typeof colors
  return {
    color: colors[tag],
    text: tag,
  }
}

export default async function Page() {
  const clippingList = sortedClippings()
  const clippingGroupList = groupByYear(clippingList)

  return (
    <List
      title="Polyglots think beyond one world."
      groups={clippingGroupList}
      extractInfo={extractInfo}
    />
  )
}
