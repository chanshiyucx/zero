'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Search from './search'
import ThemeSwitcher from './theme-switcher'

const MenuItem: React.FC<{ name: string; path: string }> = ({ name, path }) => {
  const pathname = usePathname()
  const isHome = path === '/'
  const isActive = isHome ? path === pathname : pathname.startsWith(path)

  return (
    <Link
      href={path}
      data-active={isActive}
      className="rounded-lg p-2 leading-none text-zinc-500 transition-all duration-300 hover:bg-zinc-200/50 hover:text-zinc-900 data-[active='true']:text-zinc-900"
    >
      {name}
    </Link>
  )
}

export default function Header() {
  return (
    <header className="fixed top-0 z-10 w-full max-w-screen-md">
      <div className="my-3 flex items-center justify-between rounded-lg border border-zinc-200/50 bg-zinc-50/80 px-4 backdrop-blur transition-all">
        <Link href="/" className="py-3 text-xl font-bold drop-shadow-lg">
          Reverie
        </Link>
        <div className="flex w-auto items-center gap-3">
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
