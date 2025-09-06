'use client'

import {
  AnimatePresence,
  m,
  type Transition,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useDeviceListener } from '@/hooks/use-device-listener'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { cn } from '@/lib/utils/style'
import { Menu } from './menu'
import { ThemeSwitcher } from './theme-switcher'

interface MenuItemProps {
  name: string
  path: string
  className?: string
  isActive?: boolean
}

function MenuItem({ name, path, className, isActive }: MenuItemProps) {
  const pathname = usePathname()
  const mounted = useIsMounted()
  const finalIsActive =
    mounted &&
    (isActive ?? (path === '/' ? path === pathname : pathname.startsWith(path)))

  return (
    <Link
      href={path}
      data-isactive={finalIsActive}
      className={cn('menu-button', className)}
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

const transition: Transition = { type: 'spring', stiffness: 500, damping: 30 }

const variants: Variants = {
  hidden: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0 },
}

function DropdownMenuItem({ name, path, items }: DropdownItemProps) {
  useDeviceListener()

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
          <div className="absolute top-full left-1/2 z-20 -translate-x-1/2 p-2">
            <m.div
              className="bg-surface overflow-hidden rounded-lg shadow-lg"
              variants={variants}
              transition={transition}
              initial="hidden"
              animate="enter"
              exit="hidden"
            >
              {items.map((item) => (
                <MenuItem
                  key={item.path}
                  name={item.name}
                  path={item.path}
                  isActive={pathname.startsWith(item.path)}
                  className="rounded-none py-3"
                />
              ))}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Header() {
  return (
    <header className="mt-8 flex items-center justify-between rounded-lg">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1 p-2 text-xl font-bold italic"
        >
          <Image
            src="/icon.svg"
            alt="Site Logo"
            width={16}
            height={16}
            priority
            className="mb-0.5 animate-spin duration-3000"
          />
        </Link>
        <nav className="flex items-center justify-center gap-1 max-md:hidden">
          <DropdownMenuItem
            name="Blog"
            path="/blog/posts"
            items={[
              { name: 'Posts', path: '/blog/posts' },
              { name: 'Snippets', path: '/blog/snippets' },
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
          <MenuItem name="Vibes" path="/vibes" />
          <MenuItem name="Album" path="/album" />
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <Menu />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
