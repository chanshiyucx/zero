import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { Divider } from '@/components/ui/divider'
import { sortedPosts } from '@/lib/utils/content'

export function LatestPost() {
  const latestPost = sortedPosts()[0]

  return (
    <Link
      href={latestPost.url}
      className="card flex flex-1 flex-col gap-3 bg-overlay p-3"
    >
      <span>Latest post</span>
      <Divider />
      <span className="overflow-x-hidden text-ellipsis whitespace-nowrap font-bold">
        {latestPost.title}
      </span>
      <Divider />
      <Date
        dateString={latestPost.date}
        dateFormat="LLL dd, yyyy"
        className="text-subtle"
      />
    </Link>
  )
}
