'use client'

import clsx from 'clsx'
import './index.css'
import { BookOpen, Codepen, Ghost, HeartPulse, ScrollText, Sparkles } from 'lucide-react'
import localFont from 'next/font/local'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'

const siteFont = localFont({ src: '../../assets/font/GuDianMingChaoTi.ttf', display: 'swap' })

const Header: FC = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleToggle = () => {
    setOpen((c) => !c)
  }

  return (
    <div className="header fixed z-10 flex h-16 w-screen items-center justify-between px-6 shadow-sm lg:hidden">
      <h3 className={clsx(siteFont.className, 'title text-4xl tracking-wider')}>蟬時雨</h3>

      <nav className={clsx('nav hidden items-center sm:flex', open && 'over')}>
        <Link className={clsx(pathname === '/' && 'active')} href="/">
          <ScrollText /> 创作
        </Link>
        <Link className={clsx(pathname === '/inspiration' && 'active')} href="/inspiration">
          <Sparkles /> 灵感
        </Link>
        <Link className={clsx(pathname === '/project' && 'active')} href="/project">
          <Codepen /> 项目
        </Link>
        <Link className={clsx(pathname === '/book' && 'active')} href="/book">
          <BookOpen /> 书单
        </Link>
        <Link className={clsx(pathname === '/friend' && 'active')} href="/friend">
          <HeartPulse /> 友邻
        </Link>
        <Link className={clsx(pathname === '/about' && 'active')} href="/about">
          <Ghost /> 自述
        </Link>
      </nav>

      <div className={clsx('toggle flex w-7 flex-col sm:hidden', open && 'active')} onClick={handleToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Header
