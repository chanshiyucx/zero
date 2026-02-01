'use client'

import { ArrowBendUpLeftIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Nav() {
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  const parentHref =
    segments.length === 1 ? '/' : `/${segments.slice(0, -1).join('/')}`

  let parentName = ''
  if (parentHref === '/') {
    parentName = 'Index'
  } else {
    const parentKey = parentHref.split('/').pop()!
    parentName = parentKey.charAt(0).toUpperCase() + parentKey.slice(1)
  }

  if (!parentName) return null

  const backPath = { name: parentName, href: parentHref }

  return (
    <Link
      href={backPath.href}
      className="sticky top-25 m-0 flex h-0 w-auto -translate-x-36 items-center gap-1 italic max-lg:relative max-lg:top-0 max-lg:mb-8 max-lg:h-auto max-lg:translate-x-0"
    >
      <ArrowBendUpLeftIcon weight="bold" size="18" />
      <span className="text-lg font-bold">{backPath.name}</span>
    </Link>
  )
}
