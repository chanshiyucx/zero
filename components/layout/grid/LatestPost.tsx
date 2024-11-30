import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { Divider } from '@/components/ui/divider'
import { sortedPosts } from '@/lib/sorted-posts'

export function LatestPost() {
  const latestPost = sortedPosts()[0]

  return (
    <Link
      href={`/post/${latestPost.slug}`}
      className="relative flex w-full flex-1 transform-gpu flex-col gap-3 overflow-hidden rounded-lg bg-overlay p-3 transition-all duration-500 hover:scale-[.97]"
    >
      <span>Latest post</span>
      <Divider />
      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">
        {latestPost.title}
      </span>
      <Divider />
      <span className="opacity-70">
        <Date dateString={latestPost.date} />
      </span>
    </Link>
  )
}
