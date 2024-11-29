import type { Post } from 'content-collections'
import { allPosts } from 'content-collections'
import { compareDesc } from 'date-fns'

interface PostWithTime extends Post {
  time: string
}
interface PostGroup {
  year: number
  list: PostWithTime[]
}

export default function PostLayout() {
  const postList: Post[] = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  const postGroupList: PostGroup[] = []
  postList.forEach((post) => {
    const date = new Date(post.date)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const lastGroup = postGroupList.at(-1)
    if (!lastGroup || lastGroup.year !== year) {
      postGroupList.push({ year, list: [] })
    }
    postGroupList.at(-1)?.list.push({ ...post, time: `${month}.${day}` })
  })

  return (
    <article>
      <header className="mb:4 px-2 md:mb-6">
        <h1 className="text-2xl font-extrabold md:text-4xl">
          Life is a burning chaos.
        </h1>
      </header>
      <div className="px-2 py-4 md:px-16">
        {postGroupList.map((postGroup) => (
          <div key={postGroup.year}>
            <p className="-my-2 text-xl md:text-right md:text-2xl">
              {postGroup.year}
            </p>
            <ul>
              {postGroup.list.map((post) => (
                <li key={post.title} className="mx-2 my-4 md:mx-0 md:text-xl">
                  <a className="flex gap-3 md:gap-8" href={post.url}>
                    <span>{post.time}</span>
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
