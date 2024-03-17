'use client'

import type { Contact } from '@/type'
import {
  Code,
  Github,
  GraduationCap,
  Laptop,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-react'
import { FC, useEffect, useRef } from 'react'
import Typed from 'typed.js'

const contact: Contact[] = [
  {
    icon: Mail,
    href: 'mailto:me@chanshiyu.com',
    target: '_self',
    rel: '',
  },
  {
    icon: Linkedin,
    href: '',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    icon: Github,
    href: 'mailto:me@chanshiyu.com',
    target: '_blank',
    rel: '`noopener noreferr`er',
  },
  {
    icon: Twitter,
    href: 'mailto:me@chanshiyu.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
]

const Header: FC = () => {
  const el = useRef(null)
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [`Hallo,<br>I'm Chanshiyu`],
      typeSpeed: 60,
      showCursor: true,
    })
    return () => typed.destroy()
  }, [])

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
          <h1 className="h-[90px] font-anton text-3xl leading-normal tracking-wider">
            <span ref={el}></span>
          </h1>
          <div className="mt-4 space-y-2">
            <p>
              <Laptop className="mr-1.5 inline-block align-sub" size={20} />
              前端开发者 / Front-end Developer
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
            {contact.map(({ icon: Icon, href, target, rel }) => (
              <a
                key={href}
                href={href}
                target={target}
                rel={rel}
                className="inline-flex aspect-square h-9 items-center justify-center rounded-xl border bg-transparent shadow transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
