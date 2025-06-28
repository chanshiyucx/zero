import type { Metadata } from 'next'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
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

  return (
    <main className="page">
      <header>
        <h1 className="text-4xl font-extrabold">Life is a burning chaos.</h1>
      </header>
      <section>
        {postGroupList.map((group) => (
          <div key={group.year}>
            <p className="text-right text-3xl font-extrabold">{group.year}</p>
            <ul className="space-y-2">
              {group.list.map((post) => (
                <li key={post.title}>
                  <Link className="flex gap-6" href={post.url}>
                    <Date
                      dateString={post.date}
                      className="text-subtle w-16 shrink-0"
                    ></Date>
                    <span className="link-hover text-text overflow-x-hidden text-ellipsis whitespace-nowrap">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  )
}
