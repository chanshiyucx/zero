'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { cn } from '@/lib/utils/style'
import { Menu } from './menu'
import { ThemeSwitcher } from './theme-switcher'

interface MenuItemProps {
  name: string
  path: string
}

function MenuItem({ name, path }: MenuItemProps) {
  const pathname = usePathname()
  const mounted = useIsMounted()
  const isActive = mounted && pathname.startsWith(path)

  return (
    <Link href={path} className={cn('menu-button', isActive && 'text-rose')}>
      {name}
    </Link>
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
          <MenuItem name="Posts" path="/posts" />
          <MenuItem name="Snippets" path="/snippets" />
          <MenuItem name="Leetcode" path="/leetcode" />
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
