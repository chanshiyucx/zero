import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { sortedContent } from '@/lib/utils/content'

export function LatestStats() {
  const article = sortedContent()[0]

  return (
    <Link
      href={article.url}
      className="card bg-overlay flex flex-1 flex-col gap-3 p-3"
    >
      <span>Latest stat</span>
      <span className="w-full border-b" />
      <span className="overflow-x-hidden font-bold text-ellipsis whitespace-nowrap">
        {article.title}
      </span>
      <span className="w-full border-b" />
      <Date
        dateString={article.date}
        dateFormat="LLL dd, yyyy"
        className="text-subtle"
      />
    </Link>
  )
}
