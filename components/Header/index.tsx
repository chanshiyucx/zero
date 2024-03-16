// import Image from 'next/image';
import { FC } from 'react'

// import Banner from '@/assets/images/banner.png'

const Header: FC = () => {
  return (
    <header className="relative px-2 py-6 md:px-16 md:py-12">
      <a
        href="/"
        className="max-md:mb-5 max-md:flex max-md:items-end max-md:justify-between max-md:border-b-2 max-md:border-b-gray-200 max-md:pb-2 md:absolute md:bottom-5 md:right-5 md:bg-zinc-800 md:p-5 md:text-white md:hover:text-white"
      >
        <h1 className="text-2xl font-bold tracking-wider drop-shadow-md md:text-4xl">
          人类绿洲。
        </h1>
        <p className="max-md:text-right max-md:text-sm max-md:italic">
          For shame and pride.
        </p>
      </a>
      <div className="h-[320px] w-[896px] border-4 border-zinc-800">
        <div className="px-6 py-6 pt-8">
          <h1 className="flex flex-col font-anton text-3xl leading-normal tracking-wider text-black">
            <span>Hallo,</span>
            <span>I'm Chanshiyu</span>
          </h1>
          <div className="mt-6 space-y-1.5 text-gray-900">
            <p>🧑&zwj;💻 前端开发者 / Front-end Developer</p>
            <p>🤩 正在做一些有趣的事 / Working on something interesting</p>
            <p>
              🥰
              <a
                href="https://sotake.com"
                target="_blank"
                className="hover:underline"
              >
                sotake.com
              </a>
              <span className="mx-1">·</span>
              <a
                href="https://kee.so"
                target="_blank"
                className="hover:underline"
              >
                kee.so
              </a>
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <a
              href="mailto:me@aang.dev"
              className="focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground inline-flex aspect-square h-9 items-center justify-center whitespace-nowrap rounded-xl border bg-transparent p-0 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              aria-label="me@aang.dev email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-mail text-muted-foreground size-4"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/milhamm/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground inline-flex aspect-square h-9 items-center justify-center whitespace-nowrap rounded-xl border bg-transparent p-0 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-linkedin text-muted-foreground size-4"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://github.com/milhamm"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground inline-flex aspect-square h-9 items-center justify-center whitespace-nowrap rounded-xl border bg-transparent p-0 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              aria-label="Github"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-github text-muted-foreground size-4"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a
              href="https://twitter.com/gluekol"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground inline-flex aspect-square h-9 items-center justify-center whitespace-nowrap rounded-xl border bg-transparent p-0 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-twitter text-muted-foreground size-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      {/* <Image
        src={Banner}
        className="h-80 cursor-pointer object-cover object-bottom"
        alt="Banner of the page"
      /> */}
    </header>
  )
}

export default Header
