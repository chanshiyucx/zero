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
      <section className="px-2 py-6 md:px-14 md:py-12">
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
              <p> {format(new Date(hotBlog.date), 'yyyy-MM-dd')}</p>
              <p>
                <a className="" href="/category/logs">
                  Code Library
                </a>
              </p>
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
      {/* <section id="media" className="gap-12 pt-16 md:flex md:px-16">
        <section>
          <h2
            id="desktop-title-media"
            className="hidden border-r-4 pr-5 text-3xl font-extrabold tracking-widest md:block dark:border-zinc-800"
          >
            我的踪迹
          </h2>
          <h2
            id="mobile-title-media"
            className="mb-5 text-center text-3xl font-extrabold md:hidden dark:border-zinc-800"
          >
            我的踪迹
          </h2>
        </section>
        <div>
          <ul
            id="media-list"
            className="flex flex-wrap content-start items-start justify-center gap-5 md:justify-start"
          >
            <li
              className="
border border-gray-200 bg-gray-50
transition duration-300
hover:border-lime-700 hover:text-lime-700 dark:border-zinc-700
dark:bg-zinc-900  dark:hover:border-lime-700"
            >
              <a
                href="https://github.com/BigCoke233"
                target="_blank"
                className="inline-block px-5 py-2 text-lg"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z"
                      stroke-width="0"
                      fill="currentColor"
                    ></path>
                  </svg>{' '}
                  GitHub
                </span>
              </a>
            </li>
            <li
              className="
border border-gray-200 bg-gray-50
transition duration-300
hover:border-lime-700 hover:text-lime-700 dark:border-zinc-700
dark:bg-zinc-900  dark:hover:border-lime-700"
            >
              <a
                href="https://space.bilibili.com/384247770"
                target="_blank"
                className="inline-block px-5 py-2 text-lg"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 10a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v6a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-6z"></path>
                    <path d="M8 3l2 3"></path>
                    <path d="M16 3l-2 3"></path>
                    <path d="M9 13v-2"></path>
                    <path d="M15 11v2"></path>
                  </svg>{' '}
                  Bilibili
                </span>
              </a>
            </li>
            <li
              className="
border border-gray-200 bg-gray-50
transition duration-300
hover:border-lime-700 hover:text-lime-700 dark:border-zinc-700
dark:bg-zinc-900  dark:hover:border-lime-700"
            >
              <a
                href="https://www.douban.com/people/eltrac/"
                target="_blank"
                className="inline-block px-5 py-2 text-lg"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 20h16"></path>
                    <path d="M5 4h14"></path>
                    <path d="M8 8h8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z"></path>
                    <path d="M16 14l-2 6"></path>
                    <path d="M8 17l1 3"></path>
                  </svg>{' '}
                  豆瓣
                </span>
              </a>
            </li>
            <li
              className="
border border-gray-200 bg-gray-50
transition duration-300
hover:border-lime-700 hover:text-lime-700 dark:border-zinc-700
dark:bg-zinc-900  dark:hover:border-lime-700"
            >
              <a
                href="https://www.zhihu.com/people/eltrac-6/"
                target="_blank"
                className="inline-block px-5 py-2 text-lg"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14 6h6v12h-2l-2 2l-1 -2h-1z"></path>
                    <path d="M4 12h6.5"></path>
                    <path d="M10.5 6h-5"></path>
                    <path d="M6 4c-.5 2.5 -1.5 3.5 -2.5 4.5"></path>
                    <path d="M8 6v7c0 4.5 -2 5.5 -4 7"></path>
                    <path d="M11 18l-3 -5"></path>
                  </svg>{' '}
                  知乎
                </span>
              </a>
            </li>
            <li
              className="
border border-gray-200 bg-gray-50
transition duration-300
hover:border-lime-700 hover:text-lime-700 dark:border-zinc-700
dark:bg-zinc-900  dark:hover:border-lime-700"
            >
              <a
                href="https://steamcommunity.com/profiles/76561198812226260/"
                target="_blank"
                className="inline-block px-5 py-2 text-lg"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M16.5 5a4.5 4.5 0 1 1 -.653 8.953l-4.347 3.009l0 .038a3 3 0 0 1 -2.824 3l-.176 0a3 3 0 0 1 -2.94 -2.402l-2.56 -1.098v-3.5l3.51 1.755a2.989 2.989 0 0 1 2.834 -.635l2.727 -3.818a4.5 4.5 0 0 1 4.429 -5.302z"></path>
                    <circle
                      cx="16.5"
                      cy="9.5"
                      r="1"
                      fill="currentColor"
                    ></circle>
                  </svg>{' '}
                  Steam
                </span>
              </a>
            </li>
            <li
              className="
border border-gray-200 bg-gray-50
transition duration-300
hover:border-lime-700 hover:text-lime-700 dark:border-zinc-700
dark:bg-zinc-900  dark:hover:border-lime-700"
            >
              <a
                href="https://gitee.com/Eltrac"
                target="_blank"
                className="inline-block px-5 py-2 text-lg"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    role="img"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title></title>
                    <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"></path>
                  </svg>{' '}
                  Gitee
                </span>
              </a>
            </li>
            <li
              className="
border border-gray-200 bg-gray-50
transition duration-300
hover:border-lime-700 hover:text-lime-700 dark:border-zinc-700
dark:bg-zinc-900  dark:hover:border-lime-700"
            >
              <a
                href="https://bento.me/eltrac"
                target="_blank"
                className="inline-block px-5 py-2 text-lg"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    role="img"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title></title>
                    <path d="M0 10.435c0-.256.051-.512.153-.758.233-.56.854-1.046 2.095-2.018l6.206-4.856c1.241-.972 1.862-1.458 2.577-1.64.63-.16 1.308-.16 1.938 0 .715.183 1.336.668 2.577 1.64l6.206 4.856c1.241.972 1.862 1.458 2.095 2.018.102.246.153.502.153.758v3.13c0 .256-.051.512-.153.758-.233.56-.854 1.046-2.095 2.017l-6.206 4.857c-1.241.972-1.862 1.457-2.577 1.64-.63.16-1.308.16-1.938 0-.715-.183-1.336-.668-2.577-1.64L2.248 16.34C1.007 15.37.386 14.883.153 14.323A1.971 1.971 0 0 1 0 13.565v-3.13Zm9.34-3.238.887.694c.62.485.93.728 1.289.82.315.08.653.08.968 0 .358-.092.668-.335 1.29-.82l.886-.694c.62-.486.93-.729 1.047-1.009a.975.975 0 0 0 0-.758c-.116-.28-.427-.523-1.047-1.008l-.887-.694c-.62-.486-.93-.729-1.289-.82a1.984 1.984 0 0 0-.968 0c-.358.091-.668.334-1.29.82l-.886.694c-.62.485-.93.728-1.047 1.008a.975.975 0 0 0 0 .758c.116.28.427.523 1.047 1.009Zm5.91 4.625.887.694c.62.486.931.729 1.29.82.314.08.653.08.968 0 .358-.091.668-.334 1.288-.82l.887-.694c.62-.485.931-.728 1.047-1.008a.976.976 0 0 0 0-.758c-.116-.28-.426-.523-1.047-1.009l-.887-.694c-.62-.485-.93-.728-1.288-.82a1.984 1.984 0 0 0-.969 0c-.358.092-.668.335-1.289.82l-.886.694c-.621.486-.931.729-1.047 1.009a.975.975 0 0 0 0 .758c.116.28.426.523 1.047 1.008Zm-11.82 0 6.797 5.32c.62.486.93.728 1.289.82.315.08.653.08.968 0 .358-.092.668-.334 1.29-.82l.886-.694c.62-.486.93-.729 1.047-1.009a.974.974 0 0 0 0-.758c-.116-.28-.427-.523-1.047-1.008l-6.797-5.32c-.62-.485-.931-.728-1.29-.82a1.984 1.984 0 0 0-.968 0c-.358.092-.668.335-1.288.82l-.887.694c-.62.486-.931.729-1.047 1.009a.975.975 0 0 0 0 .758c.116.28.426.523 1.047 1.008Z"></path>
                  </svg>{' '}
                  Bento
                </span>
              </a>
            </li>
            <li
              className="
border border-gray-200 bg-gray-50
transition duration-300
hover:border-lime-700 hover:text-lime-700 dark:border-zinc-700
dark:bg-zinc-900  dark:hover:border-lime-700"
            >
              <a
                href="https://keybase.io/eltrac"
                target="_blank"
                className="inline-block px-5 py-2 text-lg"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    role="img"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title></title>
                    <path d="M10.445 21.372a.953.953 0 1 1-.955-.954c.524 0 .951.43.951.955m5.923-.001a.953.953 0 1 1-.958-.954c.526 0 .954.43.954.955m4.544-9.16l-.156-.204c-.046-.06-.096-.116-.143-.175-.045-.06-.094-.113-.141-.169-.104-.12-.21-.239-.32-.359l-.075-.08-.091-.099-.135-.13c-.015-.019-.032-.035-.05-.054a10.87 10.87 0 0 0-3.955-2.504l-.23-.078.035-.083a4.109 4.109 0 0 0-.12-3.255 4.11 4.11 0 0 0-2.438-2.16c-.656-.216-1.23-.319-1.712-.305-.033-.105-.1-.577.496-1.848L10.662 0l-.287.399c-.33.455-.648.895-.945 1.328a1.857 1.857 0 0 0-1.245-.58L6.79 1.061h-.012c-.033-.003-.07-.003-.104-.003-.99 0-1.81.771-1.87 1.755l-.088 1.402v.003a1.876 1.876 0 0 0 1.755 1.98l1.002.06c-.065.84.073 1.62.405 2.306a11.28 11.28 0 0 0-3.66 2.484C.912 14.392.912 18.052.912 20.995v1.775l1.305-1.387c.266.93.652 1.807 1.145 2.615H5.06a9.197 9.197 0 0 1-1.68-3.848l1.913-2.03-.985 3.09 1.74-1.267c3.075-2.234 6.745-2.75 10.91-1.53 1.806.533 3.56.04 4.474-1.256l.104-.165c.09.498.14.998.14 1.496 0 1.563-.254 3.687-1.38 5.512h1.612c.776-1.563 1.181-3.432 1.181-5.512-.001-2.2-.786-4.421-2.184-6.274zM8.894 6.192c.122-1.002.577-1.949 1.23-2.97a1.36 1.36 0 0 0 1.283.749c.216-.008.604.025 1.233.232a2.706 2.706 0 0 1 1.608 1.425c.322.681.349 1.442.079 2.15a2.69 2.69 0 0 1-.806 1.108l-.408-.502-.002-.003a1.468 1.468 0 0 0-2.06-.205c-.334.27-.514.66-.534 1.058-1.2-.54-1.8-1.643-1.628-3.04zm4.304 5.11l-.52.425a.228.228 0 0 1-.323-.032l-.11-.135a.238.238 0 0 1 .034-.334l.51-.42-1.056-1.299a.307.307 0 0 1 .044-.436.303.303 0 0 1 .435.041l2.963 3.646a.309.309 0 0 1-.168.499.315.315 0 0 1-.31-.104l-.295-.365-1.045.854a.244.244 0 0 1-.154.055.237.237 0 0 1-.186-.09l-.477-.58a.24.24 0 0 1 .035-.335l1.05-.858-.425-.533zM7.752 4.866l-1.196-.075a.463.463 0 0 1-.435-.488l.09-1.4a.462.462 0 0 1 .461-.437h.024l1.401.091a.459.459 0 0 1 .433.488l-.007.101a9.27 9.27 0 0 0-.773 1.72zm12.525 11.482c-.565.805-1.687 1.08-2.924.718-3.886-1.141-7.397-.903-10.469.7l1.636-5.122-5.29 5.609c.098-3.762 2.452-6.967 5.757-8.312.471.373 1.034.66 1.673.841.16.044.322.074.48.102a1.41 1.41 0 0 0 .21 1.408l.075.09c-.172.45-.105.975.221 1.374l.476.582a1.39 1.39 0 0 0 1.079.513c.32 0 .635-.111.886-.314l.285-.232c.174.074.367.113.566.113a1.45 1.45 0 0 0 .928-.326c.623-.51.72-1.435.209-2.06l-1.67-2.057a4.07 4.07 0 0 0 .408-.38c.135.036.27.077.4.12.266.096.533.197.795.314a9.55 9.55 0 0 1 2.77 1.897c.03.03.06.055.086.083l.17.176c.038.039.076.079.11.12.08.085.16.175.24.267l.126.15c.045.053.086.104.13.16l.114.15c.04.05.079.102.117.154.838 1.149.987 2.329.404 3.157v.005zM7.718 4.115l-.835-.05.053-.836.834.051z"></path>
                  </svg>{' '}
                  Keybase
                </span>
              </a>
            </li>
            <li
              className="
border border-gray-200 bg-gray-50
transition duration-300
hover:border-lime-700 hover:text-lime-700 dark:border-zinc-700
dark:bg-zinc-900  dark:hover:border-lime-700"
            >
              <a
                href="mailto:hi@guhub.cn"
                target="_blank"
                className="inline-block px-5 py-2 text-lg"
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                    <path d="M3 7l9 6l9 -6"></path>
                  </svg>{' '}
                  Email
                </span>
              </a>
            </li>
          </ul>
          <p className="my-6 hidden text-lg font-semibold md:block">
            尝试在其他地方找到我。
          </p>
        </div>
      </section> */}
    </main>
  )
}
