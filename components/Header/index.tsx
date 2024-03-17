import {
  Code,
  Github,
  GraduationCap,
  Laptop,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-react'
import { FC } from 'react'

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
      <div className="w-full border-4 border-l-8 border-zinc-800 dark:border-zinc-600">
        <div className="border-l-8 border-zinc-300 p-6 dark:border-zinc-800 ">
          <h1 className="flex flex-col font-anton text-3xl leading-normal tracking-wider">
            <span>Hallo,</span>
            <span>I'm Chanshiyu</span>
          </h1>
          <div className="mt-4 space-y-1.5">
            <p>
              <Laptop className="mr-1.5 inline-block align-sub" size={20} />
              前端开发者 /Front-end Developer
            </p>
            <p>
              <Code className="mr-1.5 inline-block align-sub" size={20} />
              正在做一些有趣的事 / Working on something interesting
            </p>
            <p>
              <GraduationCap
                className="mr-1.5 inline-block align-sub"
                size={20}
              />
              电子科技大学 / UESTC
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <a
              href="mailto:me@chanshiyu.com"
              className="inline-flex aspect-square h-9 items-center justify-center rounded-xl border bg-transparent shadow transition-colors"
              aria-label="me@chanshiyu.com email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/milhamm/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex aspect-square h-9 items-center justify-center rounded-xl border bg-transparent shadow transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/milhamm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex aspect-square h-9 items-center justify-center rounded-xl border bg-transparent shadow transition-colors"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com/gluekol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex aspect-square h-9 items-center justify-center rounded-xl border bg-transparent shadow transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
