import type { Post } from 'content-collections'
import type { Metadata } from 'next'
import { getYear } from 'date-fns'
import Link from 'next/link'
import { Switcher } from '@/components/layout/switcher'
import { Date } from '@/components/ui/date'
import { sortedPosts } from '@/lib/utils/content'

interface PostGroup {
  year: number
  list: Post[]
}

export const metadata: Metadata = {
  title: 'Posts',
  description:
    'A collection of my personal posts and thoughts on a variety of topics I enjoy, with a focus on technology.',
  keywords: ['blog', 'posts', 'thoughts', 'technical', 'tutorials'],
}

export default function Page() {
  const postList = sortedPosts()
  const postGroupList: PostGroup[] = []
  postList.forEach((post) => {
    const year = getYear(post.date)
    const lastGroup = postGroupList.at(-1)
    if (!lastGroup || lastGroup.year !== year) {
      postGroupList.push({ year, list: [] })
    }
    postGroupList.at(-1)?.list.push(post)
  })

  return (
    <article className="page">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">Life is a burning chaos.</h1>
        <Switcher />
      </header>
      <div>
        {postGroupList.map((postGroup) => (
          <div key={postGroup.year}>
            <p className="text-right text-3xl font-extrabold">
              {postGroup.year}
            </p>
            <ul className="space-y-2">
              {postGroup.list.map((post) => (
                <li key={post.title}>
                  <Link className="flex gap-6" href={post.url}>
                    <Date
                      dateString={post.date}
                      className="w-16 shrink-0 text-subtle"
                    ></Date>
                    <span className="link-hover overflow-x-hidden text-ellipsis whitespace-nowrap text-text">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  )
}
