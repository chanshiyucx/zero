'use client'

import clsx from 'clsx'
import { useState } from 'react'
import BackToHome from './back-to-home'
import Menu from './menu'
import ScrollTop from './scroll-top'
import ThemeSwitcher from './theme-switcher'

export default function Helpbar() {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => setOpen((c) => !c)

  return (
    <section>
      <Menu toggleMenu={toggleMenu} />
      <ul
        className={clsx(
          !open && 'max-md:-translate-y-full',
          `fixed right-0 z-10 flex gap-6 shadow-sm transition-transform max-md:top-0 max-md:w-full max-md:justify-center max-md:bg-zinc-50/85 max-md:py-6 max-md:backdrop-blur-sm md:bottom-6 md:right-6 md:flex-col md:gap-2 dark:max-md:bg-zinc-700/85`,
        )}
      >
        <ScrollTop />
        <BackToHome />
        <ThemeSwitcher />
      </ul>
    </section>
  )
}
