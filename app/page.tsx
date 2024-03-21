import type { Blog } from 'contentlayer/generated'
import { allBlogs } from 'contentlayer/generated'
import { compareDesc, format } from 'date-fns'
import Link from 'next/link'
import MDX from '@/components/MDX'

export default function Page() {
  const blogList: Blog[] = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
  const hotBlog = blogList[0]

  return (
    <main>
      <section className="p-2 md:px-14 md:py-4">
        <article>
          <header className="px-2">
            <div className="section-head">BLOG</div>
            <h1 className="text-2xl font-extrabold md:text-4xl">
              <Link
                className="link"
                href={hotBlog.url}
                data-content={hotBlog.title}
              >
                {hotBlog.title}
              </Link>
            </h1>
          </header>
          <section className="px-2">
            <div className="mb-3 mt-6 text-justify">
              <MDX code={hotBlog.summary.code} />
            </div>
            <div className="flex justify-between text-justify text-zinc-400">
              <span> {format(new Date(hotBlog.date), 'yyyy-MM-dd')}</span>
              <span>Code Library</span>
            </div>
          </section>
        </article>
        <div className="mt-10">
          <h2 className="md:text-md flex items-center justify-between gap-3 text-center text-lg md:text-left">
            <span className="block h-0.5 flex-grow bg-zinc-200 md:hidden dark:bg-zinc-800"></span>
            <span>HISTORY BLOG</span>
            <span className="block h-0.5 flex-grow bg-zinc-200 md:hidden dark:bg-zinc-800"></span>
          </h2>
          <ul className="mb-8 mt-5 list-square space-y-5 text-lg font-semibold">
            <li className="ml-5 md:ml-8">
              <a className="link" href="/blog/i-think-like-a-river">
                The Origins Of Dune
              </a>
            </li>
            <li className="ml-5 md:ml-8">
              <a className="link" href="/blog/simplicity-the-ultimate-answer">
                The View From Here
              </a>
            </li>
            <li className="ml-5 md:ml-8">
              <a className="link" href="/blog/no-need-for-passion">
                The Villanelle: A Poetry Workshop
              </a>
            </li>
          </ul>
          <p className="flex items-center justify-between gap-3 text-right md:block md:text-left">
            <span className="block h-0.5 flex-grow bg-gray-200 md:hidden dark:bg-zinc-700"></span>
            <a className="bg-zinc-800 px-4 py-2 text-zinc-200" href="/blog">
              READ MORE
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
