import type { Post } from 'content-collections'
import type { Metadata } from 'next'
import { getYear } from 'date-fns'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { sortedPosts } from '@/lib/content'

interface PostGroup {
  year: number
  list: Post[]
}

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'A collection of my personal posts and thoughts on a variety of topics I enjoy, with a focus on technology.',
  keywords: ['blog', 'notes', 'thoughts', 'technical', 'tutorials', 'posts'],
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
    <article className="page space-y-20">
      <header>
        <h1 className="text-4xl font-extrabold">Life is a burning chaos.</h1>
      </header>
      <div>
        {postGroupList.map((postGroup) => (
          <div key={postGroup.year}>
            <p className="text-right text-2xl">{postGroup.year}</p>
            <ul className="space-y-2">
              {postGroup.list.map((post) => (
                <li key={post.title}>
                  <Link className="flex gap-6" href={post.url}>
                    <Date
                      dateString={post.date}
                      className="w-16 shrink-0 text-subtle"
                    ></Date>
                    <span>{post.title}</span>
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
