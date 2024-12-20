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
}

function MenuItem({ name, path, className }: MenuItemProps) {
  const pathname = usePathname()
  const isHome = path === '/'
  const isActive = isHome ? path === pathname : pathname.startsWith(path)

  return (
    <Link
      href={path}
      data-isactive={isActive}
      className={clsx('menuitem rounded-lg p-2 font-semibold', className)}
    >
      {name}
    </Link>
  )
}

const variants = {
  hidden: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function BlogMenuItem({ name, path }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false)

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
            className="absolute -left-5 top-full w-24 rounded-lg bg-surface shadow-lg"
            variants={variants}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          >
            <MenuItem
              name="Posts"
              path="/blog/posts"
              className="rounded-b-none py-3 text-center"
            />
            <MenuItem
              name="Notes"
              path="/blog/notes"
              className="rounded-t-none py-3 text-center"
            />
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
