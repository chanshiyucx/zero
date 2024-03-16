'use client'

// import type { Post } from 'contentlayer/generated'
// import AOS from 'aos'
// import clsx from 'clsx'
// import { allPosts } from 'contentlayer/generated'
// import { compareDesc, format } from 'date-fns'
// import { Bookmark, Calendar, Tag } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { MouseEvent, useEffect, useRef, useState } from 'react'
// import MDX from '@/components/MDX'
import { ThemeSwitcherButton } from './theme-switcher-button'

export default function Page() {
  return (
    <main>
      <section className="px-2 md:flex md:gap-14">
        <article id="blog-latest" className="md:w-2/3">
          <header className="undefined px-2 md:flex md:items-end md:gap-6">
            <h1 className="text-2xl font-extrabold md:text-5xl">
              <a
                className="transition hover:text-lime-700"
                href="/blog/meeting-manjaro"
              >
                Manjaro 桌面折腾记
              </a>
            </h1>
            <p className="font-semibold text-gray-600 md:text-xl"></p>
          </header>
          <section id="blog-latest-meta" className="px-2">
            <p className="my-5 text-lg">
              我的本科导师在大一刚开学，还未正式行课的时候，给我们发了一份二十多页的Word文档，要求我们在两周内按照文档的指导自行安装Windows和Manjaro的双系统，原因是程序设计作业需要在Linux系统上编写、调试和运行。我向来不喜欢未经思考就接受别人交给我的任务，所以当我面对这一个多少有些强人所难的......
            </p>
            <div className="flex justify-between text-justify text-gray-500">
              <p>2024-02-14</p>
              <p>
                <a
                  className="transition hover:text-lime-700"
                  href="/category/logs"
                >
                  非我他物
                </a>
              </p>
            </div>
          </section>
        </article>

        <div id="blog-list" className="my-10 md:w-1/3">
          <h2 className="md:text-md flex items-center justify-between gap-3 text-center text-lg text-lime-700 md:block md:text-left">
            <span className="block h-0.5 flex-grow bg-gray-200 md:hidden dark:bg-zinc-700"></span>
            <span>Previous Posts</span>
            <span className="block h-0.5 flex-grow bg-gray-200 md:hidden dark:bg-zinc-700"></span>
          </h2>
          <ul className="text-lg font-semibold md:text-xl">
            <li className="list-square my-5 ml-5 md:mx-5 md:ml-10">
              <a
                className="transition hover:text-lime-700"
                href="/blog/i-think-like-a-river"
              >
                我的思绪像河流
              </a>
            </li>
            <li className="list-square my-5 ml-5 md:mx-5 md:ml-10">
              <a
                className="transition hover:text-lime-700"
                href="/blog/simplicity-the-ultimate-answer"
              >
                剔除每一寸多余的杂质
              </a>
            </li>
            <li className="list-square my-5 ml-5 md:mx-5 md:ml-10">
              <a
                className="transition hover:text-lime-700"
                href="/blog/no-need-for-passion"
              >
                毫无必要的热情
              </a>
            </li>
          </ul>
          <p className="flex items-center justify-between gap-3 text-right md:block md:text-left">
            <span className="block h-0.5 flex-grow bg-gray-200 md:hidden dark:bg-zinc-700"></span>
            <a className="text-lime-700" href="/blog">
              查看更多
            </a>
          </p>
        </div>
      </section>

      <ThemeSwitcherButton />
    </main>
  )
}
