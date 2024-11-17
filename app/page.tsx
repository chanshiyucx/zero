import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import { ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import MDX from '@/components/MDX'

export default function Page() {
  const postList: Post[] = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  const hotPost = postList[0]
  const lastPostList = postList.slice(1, 3)

  return (
    <main className="flex-1">
      <section className="p-2 md:px-16 md:py-4">
        <article>
          <header className="group relative pr-24 duration-300 hover:-ml-0.5 md:-ml-8">
            <h1 className="text-2xl font-extrabold md:text-4xl">
              <Link href={hotPost.url} data-content={hotPost.title}>
                {hotPost.title}
              </Link>
            </h1>
            <div className="absolute bottom-0 right-0 flex items-center opacity-0 duration-200 group-hover:opacity-100">
              <span className="italic">Read Post</span>
              <ChevronsRight className="bounce-right ml-1" size={16} />
            </div>
          </header>
          <section>
            <div className="mb-3 mt-5">
              <MDX code={hotPost.summary.code} />
            </div>
            <div className="space-x-2 text-zinc-400">
              <span>{format(new Date(hotPost.date), 'yyyy-MM-dd')}</span>
              <span>/</span>
              <span>/</span>
              <span>
                {hotPost.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </span>
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
          </ul>
          <p className="absolute bottom-0 right-0 flex items-center justify-between gap-3 text-right md:block md:text-left">
            <span className="block h-0.5 flex-grow md:hidden"></span>
            <a className="flex items-center px-4 py-2" href="/posts">
              <span className="italic">READ MORE</span>
              <ChevronsRight className="bounce-right ml-1" size={16} />
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
