'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Map } from './map'
import { Search } from './search'
import { ThemeSwitcher } from './theme-switcher'

interface MenuItemProps {
  name: string
  path: string
  className?: string
  isActive?: boolean
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

interface DropdownItemProps {
  name: string
  path: string
  items: Array<{
    name: string
    path: string
  }>
}

const variants = {
  hidden: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function DropdownMenuItem({ name, path, items }: DropdownItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isActive = items.some((item) => pathname.startsWith(item.path))

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <MenuItem name={name} path={path} isActive={isActive} />
      <AnimatePresence>
        {isOpen && (
          <div className="absolute top-full left-1/2 z-10 -translate-x-1/2 p-2">
            <motion.div
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={variants}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            >
              <div className="bg-surface rounded-lg shadow-lg">
                {items.map((item, index) => (
                  <MenuItem
                    key={item.path}
                    name={item.name}
                    path={item.path}
                    isActive={pathname.startsWith(item.path)}
                    className={clsx(
                      'py-3',
                      index === 0 && 'rounded-b-none',
                      index === items.length - 1 && 'rounded-t-none',
                      index !== 0 &&
                        index !== items.length - 1 &&
                        'rounded-none',
                    )}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Header() {
  return (
    <header className="my-3 flex items-center justify-between rounded-lg">
      <Link
        href="/"
        className="flex items-center gap-1 py-3 text-xl font-bold italic"
      >
        <Image
          src="/apple-touch-icon.png"
          alt="Site Logo"
          width={24}
          height={24}
          priority
        />
        Shiyu
      </Link>
      <div className="flex items-center gap-3">
        <nav className="flex items-center justify-center gap-1 max-md:hidden">
          <MenuItem name="Home" path="/" />
          <DropdownMenuItem
            name="Blog"
            path="/blog/posts"
            items={[
              { name: 'Posts', path: '/blog/posts' },
              { name: 'Notes', path: '/blog/notes' },
              { name: 'Leetcode', path: '/blog/leetcode' },
            ]}
          />
          <DropdownMenuItem
            name="Polyglot"
            path="/polyglot/english"
            items={[
              { name: 'English', path: '/polyglot/english' },
              { name: 'German', path: '/polyglot/german' },
            ]}
          />
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
