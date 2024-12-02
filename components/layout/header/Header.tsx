'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logo from '@/public/apple-touch-icon.png'
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
      className="menuitem rounded-lg p-2 font-semibold"
    >
      {name}
    </Link>
  )
}

export function Header() {
  return (
    <header className="my-3 flex items-center justify-between rounded-lg px-4">
      <Link href="/" className="flex items-center py-3 text-xl font-bold">
        <Image src={logo} alt="Site Logo" className="mr-1 w-6" priority />
        Reverie
      </Link>
      <div className="flex items-center gap-3">
        <nav className="flex items-center justify-center">
          <MenuItem name="Home" path="/" />
          <MenuItem name="Blog" path="/posts" />
          <MenuItem name="Projects" path="/projects" />
          <MenuItem name="Leetcode" path="/leetcode" />
          <MenuItem name="Album" path="/album" />
        </nav>
        <Search />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
