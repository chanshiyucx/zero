'use client'

import clsx from 'clsx'
import {
  BookMarked,
  BookOpen,
  Codepen,
  Ghost,
  Github,
  HeartPulse,
  Mail,
  Music,
  ScrollText,
  Send,
  Sparkles,
  Twitter,
} from 'lucide-react'
import localFont from 'next/font/local'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import Poetry from '@/components/Poetry'
import config from '@/utils/config'
import './index.css'

const siteFont = localFont({ src: '../../assets/font/GuDianMingChaoTi.ttf', display: 'swap' })

const { github, twitter, telegram, email, music, blog } = config.contact

const Side: FC = () => {
  const pathname = usePathname()

  return (
    <div className="side fixed left-0 top-0 hidden h-full flex-col justify-between overflow-hidden lg:flex">
      {/* side menu */}
      <div className="z-10 flex h-3/5 w-full justify-end">
        <nav className="nav nav-y flex w-12 flex-col items-center justify-end">
          <Link className={clsx(pathname === '/' && 'active')} href="/" data-name="首页">
            <ScrollText />
          </Link>
          <Link className={clsx(pathname === '/inspiration' && 'active')} href="/inspiration" data-name="灵感">
            <Sparkles />
          </Link>
          <Link className={clsx(pathname === '/project' && 'active')} href="/project" data-name="项目">
            <Codepen />
          </Link>
          <Link className={clsx(pathname === '/book' && 'active')} href="/book" data-name="书单">
            <BookOpen />
          </Link>
          <Link className={clsx(pathname === '/friend' && 'active')} href="/friend" data-name="友邻">
            <HeartPulse />
          </Link>
          <Link className={clsx(pathname === '/about' && 'active')} href="/about" data-name="自述">
            <Ghost />
          </Link>
        </nav>

        <div className={clsx(siteFont.className, 'head flex w-2/3 flex-col justify-end pb-3 pl-3')}>
          <h3 className="title text-6xl tracking-wider">蟬時雨</h3>
          <span className="subtitle pb-8 pl-1 pt-2 text-xl tracking-wider">蝉鸣如雨 花宵道中</span>
          <Poetry />
        </div>
      </div>

      {/* footer menu */}
      <div className="flex justify-end py-12">
        <div className="nav nav-x flex h-12 w-2/3 items-center ">
          <a href={github} rel="noopener noreferrer" target="_blank">
            <Github />
          </a>
          <a href={twitter} rel="noopener noreferrer" target="_blank">
            <Twitter />
          </a>
          <a href={telegram} rel="noopener noreferrer" target="_blank">
            <Send />
          </a>
          <a href={email} rel="noopener noreferrer" target="_blank">
            <Mail />
          </a>
          <a href={music} rel="noopener noreferrer" target="_blank">
            <Music />
          </a>
          <a href={blog} rel="noopener noreferrer" target="_blank">
            <BookMarked />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Side
