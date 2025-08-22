import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { DateTime } from '@/components/ui/datetime'
import { sortedPriorityContent } from '@/lib/utils/content'

export function LatestStats() {
  const article = sortedPriorityContent[0]

  return (
    <Card className="overflow-hidden">
      <Link
        href={article.url}
        className="bg-overlay flex flex-col gap-3 rounded-lg p-3"
      >
        <span>Latest stat</span>
        <span className="w-full border-b" />
        <span className="overflow-x-hidden font-bold text-ellipsis whitespace-nowrap">
          {article.title}
        </span>
        <span className="w-full border-b" />
        <DateTime
          dateString={article.date}
          dateFormat="LLL dd, yyyy"
          className="text-subtle"
        />
      </Link>
    </Card>
  )
}
