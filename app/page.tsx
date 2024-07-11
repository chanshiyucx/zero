import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import Link from 'next/link'
import MDX from '@/components/MDX'

export default function Page() {
  const postList: Post[] = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  const hotPost = postList[0]
  const lastPostList = postList.slice(1, 3)

  return (
    <main>
      <section className="p-2 md:px-14 md:py-4">
        <article>
          <header className="px-2">
            <h1 className="-ml-8 text-2xl font-extrabold md:text-4xl">
              <Link
                className="link"
                href={hotPost.url}
                data-content={hotPost.title}
              >
                {hotPost.title}
              </Link>
            </h1>
          </header>
          <section className="px-2">
            <div className="mb-3 mt-6">
              <MDX code={hotPost.summary.code} />
            </div>
            <div className="flex justify-between text-zinc-400">
              <span> {format(new Date(hotPost.date), 'yyyy-MM-dd')}</span>
              <span>{hotPost.category}</span>
            </div>
          </section>
        </article>
        <div className="relative mt-10">
          <h2 className="md:text-md flex items-center justify-between gap-3 text-center text-lg md:text-left">
            <span className="block h-0.5 flex-grow bg-zinc-200 md:hidden dark:bg-zinc-800"></span>
            <span>LATEST BLOG</span>
            <span className="block h-0.5 flex-grow bg-zinc-200 md:hidden dark:bg-zinc-800"></span>
          </h2>
          <ul className="mb-8 mt-5 list-square space-y-5 text-lg font-semibold">
            {lastPostList.map((post) => (
              <li key={post.title} className="ml-5 md:ml-8">
                <a href={post.url}>{post.title}</a>
              </li>
            ))}
            {lastPostList.map((post) => (
              <li key={post.title + 'a'} className="ml-5 md:ml-8">
                <a href={post.url}>{post.title}</a>
              </li>
            ))}
            {lastPostList.map((post) => (
              <li key={post.title + 'b'} className="ml-5 md:ml-8">
                <a href={post.url}>{post.title}</a>
              </li>
            ))}
          </ul>
          <p className="absolute bottom-0 right-0 flex items-center justify-between gap-3 text-right md:block md:text-left">
            <span className="block h-0.5 flex-grow md:hidden"></span>
            <a className="px-4 py-2" href="/posts">
              READ MORE
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
