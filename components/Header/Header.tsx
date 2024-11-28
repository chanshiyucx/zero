'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from './Search'
import { ThemeSwitcher } from './ThemeSwitcher'

interface MenuItemProps {
  name: string
  path: string
}

function MenuItem({ name, path }: MenuItemProps) {
  const pathname = usePathname()
  const isHome = path === '/'
  const isActive = isHome ? path === pathname : pathname.startsWith(path)

  return (
    <Link
      href={path}
      data-isactive={isActive}
      className="menuitem rounded-lg p-2"
    >
      {name}
    </Link>
  )
}

export function Header() {
  return (
    <header className="fixed top-0 z-10 w-full max-w-screen-md">
      <div className="card my-3 flex items-center justify-between rounded-lg px-4 backdrop-blur">
        <Link href="/" className="py-3 text-xl font-bold drop-shadow">
          Reverie
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex items-center justify-center">
            <MenuItem name="Home" path="/" />
            <MenuItem name="Blog" path="/blog" />
            <MenuItem name="Projects" path="/projects" />
            <MenuItem name="Leetcode" path="/leetcode" />
            <MenuItem name="About" path="/about" />
          </nav>
          <Search />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
