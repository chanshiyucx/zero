import type { Post } from 'content-collections'
import { getYear } from 'date-fns'
import { Date } from '@/components/ui/date'
import { sortedPosts } from '@/lib/sorted-posts'

interface PostGroup {
  year: number
  list: Post[]
}

export default function PostLayout() {
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
            <ul>
              {postGroup.list.map((post) => (
                <li key={post.title} className="my-4 text-xl">
                  <a className="flex gap-8" href={post.url}>
                    <Date dateString={post.date} dateFormat="LLL d"></Date>
                    <span className="font-bold">{post.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  )
}
