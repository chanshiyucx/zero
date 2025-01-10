'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Map } from './Map'
import { Search } from './Search'
import { ThemeSwitcher } from './ThemeSwitcher'

interface MenuItemProps {
  name: string
  path: string
  className?: string
  isActive?: boolean
}

const variants = {
  hidden: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function MenuItem({ name, path, className, isActive }: MenuItemProps) {
  const pathname = usePathname()
  const isHome = path === '/'
  if (isActive === undefined) {
    isActive = isHome ? path === pathname : pathname.startsWith(path)
  }

  return (
    <Link
      href={path}
      data-isactive={isActive}
      className={clsx('menu-button', className)}
    >
      {name}
    </Link>
  )
}

function BlogMenuItem({ name, path }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isNotes = pathname.startsWith('/blog/notes')
  const isPosts = pathname.startsWith('/blog/posts') || pathname === '/blog'

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <MenuItem name={name} path={path} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            className="absolute -left-7 top-full w-28 p-2"
            variants={variants}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          >
            <div className="rounded-lg bg-surface shadow-lg">
              <MenuItem
                name="Posts"
                path="/blog/posts"
                isActive={isPosts}
                className="rounded-b-none py-3 text-center"
              />
              <MenuItem
                name="Notes"
                path="/blog/notes"
                isActive={isNotes}
                className="rounded-t-none py-3 text-center"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Header() {
  return (
    <header className="my-3 flex items-center justify-between rounded-lg">
      <Link href="/" className="flex items-center gap-1 py-3 text-xl font-bold">
        <Image
          src="/apple-touch-icon.png"
          alt="Site Logo"
          width={24}
          height={24}
          priority
        />
        Reverie
      </Link>
      <div className="flex items-center gap-3">
        <nav className="flex items-center justify-center gap-1 max-md:hidden">
          <MenuItem name="Home" path="/" />
          <BlogMenuItem name="Blog" path="/blog" />
          <MenuItem name="Leetcode" path="/leetcode" />
          <MenuItem name="Projects" path="/projects" />
          <MenuItem name="Album" path="/album" />
        </nav>
        <Search />
        <Map />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
