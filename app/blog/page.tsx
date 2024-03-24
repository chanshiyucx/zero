import type { Blog } from 'contentlayer/generated'
import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

interface BlogWithTime extends Blog {
  time: string
}
interface BlogGroup {
  year: number
  list: BlogWithTime[]
}

export default function BlogLayout() {
  const blogList: Blog[] = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  const categories = [...new Set(blogList.map((e) => e.category))]
  const blogGroupList: BlogGroup[] = []
  blogList.forEach((blog) => {
    const date = new Date(blog.date)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const lastGroup = blogGroupList.at(-1)
    if (!lastGroup || lastGroup.year !== year) {
      blogGroupList.push({ year, list: [] })
    }
    blogGroupList.at(-1)?.list.push({ ...blog, time: `${month}.${day}` })
  })

  return (
    <article>
      <header className="mb:4 px-2 md:mb-8">
        <h1 className="text-2xl font-extrabold md:text-4xl">
          Life is a burning chaos.
        </h1>
      </header>
      <div className="px-2 py-4 md:px-16">
        <section className="mb-4 flex gap-4">
          <h2>Categories: </h2>
          <ul className="flex flex-grow gap-2">
            {categories.map((category) => (
              <li
                key={category}
                className="rounded bg-zinc-200 px-2 text-center text-zinc-700 transition"
              >
                {category}
              </li>
            ))}
          </ul>
        </section>
        <ul>
          {blogGroupList.map((blogGroup) => (
            <>
              <li className="-my-2 font-mono text-xl md:text-right md:text-2xl">
                {blogGroup.year}
              </li>
              {blogGroup.list.map((blog) => (
                <li key={blog.title} className="mx-2 my-4 md:mx-0 md:text-xl">
                  <a className="flex gap-3 md:gap-8" href={blog.url}>
                    <span className="font-mono">{blog.time}</span>
                    <span className="font-bold">{blog.title}</span>
                  </a>
                </li>
              ))}
            </>
          ))}
        </ul>
      </div>
    </article>
  )
}
