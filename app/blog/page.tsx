// import type { Post } from 'contentlayer/generated'
// import { allPosts } from 'contentlayer/generated'
// import MDX from '@/components/MDX'
import { allBlogs } from 'contentlayer/generated'

export default function BlogLayout() {
  // const post: Post = allPosts.filter((post) => post.category === '真我之名')[0]

  console.log('page: ', allBlogs)

  return (
    <article>
      <header className="px-2 md:flex md:items-end md:gap-6">
        <h1 className="text-2xl font-extrabold md:text-5xl">被陈列的想法</h1>
        <p className="font-semibold text-zinc-600 md:text-xl">
          就这样存在于此。
        </p>
      </header>
      <div className="undefined px-2 py-5 md:px-16">
        <section
          id="blogCategoryList"
          className="undefined mb-8 md:mb-0 md:mt-8 md:flex md:gap-4"
        >
          <h2 className="hidden text-gray-500 md:block">Categories: </h2>
          <ul className="flex flex-grow gap-2">
            <a
              className="rounded-sm bg-gray-200 px-2 text-center transition hover:bg-lime-700 hover:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-lime-700"
              href="/category/pieces"
            >
              无心文字
            </a>
            <a
              className="rounded-sm bg-gray-200 px-2 text-center transition hover:bg-lime-700 hover:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-lime-700"
              href="/category/essays"
            >
              话题深潜
            </a>
            <a
              className="rounded-sm bg-gray-200 px-2 text-center transition hover:bg-lime-700 hover:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-lime-700"
              href="/category/logs"
            >
              非我他物
            </a>
            <a
              className="rounded-sm bg-gray-200 px-2 text-center transition hover:bg-lime-700 hover:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-lime-700"
              href="/category/fictions"
            >
              算是小说
            </a>
            <a
              className="rounded-sm bg-gray-200 px-2 text-center transition hover:bg-lime-700 hover:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-lime-700"
              href="/category/poetry"
            >
              像是诗歌
            </a>
          </ul>
        </section>
        <section id="blogArchiveList">
          <ul>
            <li className="-my-2 font-mono text-xl text-gray-500 md:text-right md:text-2xl">
              <div className="jsx-6abdde91a0274a44 highlighter undefined">
                <span className="jsx-6abdde91a0274a44 relative">2024</span>
              </div>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a className="flex gap-3 md:gap-8" href="/blog/meeting-manjaro">
                <span className="font-mono text-gray-600">02.14</span>
                <span className="font-bold transition hover:text-lime-700">
                  Manjaro 桌面折腾记
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a
                className="flex gap-3 md:gap-8"
                href="/blog/i-think-like-a-river"
              >
                <span className="font-mono text-gray-600">02.09</span>
                <span className="font-bold transition hover:text-lime-700">
                  我的思绪像河流
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a
                className="flex gap-3 md:gap-8"
                href="/blog/simplicity-the-ultimate-answer"
              >
                <span className="font-mono text-gray-600">01.23</span>
                <span className="font-bold transition hover:text-lime-700">
                  剔除每一寸多余的杂质
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a
                className="flex gap-3 md:gap-8"
                href="/blog/no-need-for-passion"
              >
                <span className="font-mono text-gray-600">01.07</span>
                <span className="font-bold transition hover:text-lime-700">
                  毫无必要的热情
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a
                className="flex gap-3 md:gap-8"
                href="/blog/2024-new-year-greetings"
              >
                <span className="font-mono text-gray-600">01.01</span>
                <span className="font-bold transition hover:text-lime-700">
                  写在 2024 的开头
                </span>
              </a>
            </li>
            <li className="-my-2  font-mono text-xl text-gray-500 md:text-right md:text-2xl">
              <div className="jsx-6abdde91a0274a44 highlighter undefined">
                <span className="jsx-6abdde91a0274a44 relative">2023</span>
              </div>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a
                className="flex gap-3 md:gap-8"
                href="/blog/bizzare-practice-of-indie-blog"
              >
                <span className="font-mono text-gray-600">12.08</span>
                <span className="font-bold transition hover:text-lime-700">
                  新时代独立博客走弯路式搭建的最佳实践
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a
                className="flex gap-3 md:gap-8"
                href="/blog/just-a-faceless-dream"
              >
                <span className="font-mono text-gray-600">08.01</span>
                <span className="font-bold transition hover:text-lime-700">
                  只是一段无面的梦境
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a className="flex gap-3 md:gap-8" href="/blog/the-suitcase">
                <span className="font-mono text-gray-600">07.08</span>
                <span className="font-bold transition hover:text-lime-700">
                  手提箱
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a className="flex gap-3 md:gap-8" href="/blog/golden">
                <span className="font-mono text-gray-600">01.16</span>
                <span className="font-bold transition hover:text-lime-700">
                  溶于水的金黄
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a
                className="flex gap-3 md:gap-8"
                href="/blog/2023-new-year-greetings"
              >
                <span className="font-mono text-gray-600">01.01</span>
                <span className="font-bold transition hover:text-lime-700">
                  写在 2023 的开头
                </span>
              </a>
            </li>
            <li className="-my-2  font-mono text-xl text-gray-500 md:text-right md:text-2xl">
              <div className="jsx-6abdde91a0274a44 highlighter undefined">
                <span className="jsx-6abdde91a0274a44 relative">2022</span>
              </div>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a
                className="flex gap-3 md:gap-8"
                href="/blog/words-repeated-are-words-lost"
              >
                <span className="font-mono text-gray-600">12.09</span>
                <span className="font-bold transition hover:text-lime-700">
                  重复在剥离意义
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a className="flex gap-3 md:gap-8" href="/blog/past-sight">
                <span className="font-mono text-gray-600">11.14</span>
                <span className="font-bold transition hover:text-lime-700">
                  从角落里走过的人
                </span>
              </a>
            </li>
            <li className="mx-2 my-5 md:mx-0 md:text-xl">
              <a className="flex gap-3 md:gap-8" href="/blog/midnight-kiss">
                <span className="font-mono text-gray-600">09.09</span>
                <span className="font-bold transition hover:text-lime-700">
                  午夜吻我
                </span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </article>
  )
}
