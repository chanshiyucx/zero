'use client'

import type { ThemeType } from '@/type'
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
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useLayoutEffect, useState } from 'react'
import { Butterfly } from '@/components/Icons'
import Panel from '@/components/Panel'
import ShootingStar from '@/components/ShootingStar'
import Site from '@/components/Site'
import { random } from '@/utils'
import config from '@/utils/config'
import { useLocalStorage } from '@/utils/hook'
import themeList from '@/utils/theme'
import './index.css'

const { github, twitter, telegram, email, music, blog } = config.contact
const randomTheme = themeList[random(0, themeList.length)]

const Side: FC = () => {
  const pathname = usePathname()
  const [showPanel, setShowPanel] = useState(false)
  const [theme, setTheme] = useLocalStorage<ThemeType>('theme', randomTheme.type, 24 * 60 * 60 * 1000)

  const toggleTheme = (theme: ThemeType) => setTheme(theme)
  const togglePanle = () => setShowPanel((c) => !c)

  useLayoutEffect(() => {
    const t = themeList.find((e) => e.type === theme)
    if (!t) return
    document.documentElement.style.setProperty('--theme-color', t.color.primary)
    document.documentElement.style.setProperty('--background-color', t.color.background)
    document.documentElement.style.setProperty('--background-image', `url('${t.image.src}')`)
    const element = document.getElementsByTagName('body')[0]
    const classList = themeList.map((e) => e.type)
    element.classList.remove(...classList)
    element.classList.add(theme)
  }, [theme])

  return (
    <div className="side sticky top-0 hidden h-screen min-w-[24rem] flex-col items-start justify-between lg:flex">
      <ShootingStar />
      {showPanel && <Panel list={themeList} theme={theme} toggleTheme={toggleTheme} togglePanle={togglePanle} />}

      {/* side menu */}
      <div className="z-20 flex h-3/5 w-full justify-end">
        <nav className="nav nav-y flex w-12 flex-col items-center justify-end">
          <Link className={clsx(pathname === '/' && 'active')} href="/" data-name="创作">
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

        <Site />
      </div>

      {/* footer menu */}
      <div className="flex justify-end py-12">
        <div className="nya" data-name="時与风" onClick={togglePanle}>
          <Butterfly />
        </div>
        <div className="nav nav-x flex h-12 items-center ">
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
