'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type TinyLinkProps = {
  href: string
  label: string
  isActive: boolean
}

function TinyLink({ href, label, isActive }: TinyLinkProps) {
  return (
    <Link
      href={href}
      data-isactive={isActive}
      className="bg-muted/10 text-subtle data-[isactive='true']:bg-surface data-[isactive='true']:text-text hover:text-text data-[isactive='true']:hover:bg-surface flex px-4 py-2 text-sm font-medium transition"
    >
      {label}
    </Link>
  )
}

export function Switcher() {
  const pathname = usePathname()
  const isNotes = pathname.startsWith('/blog/notes')

  return (
    <ul className="bg-surface flex w-fit items-center overflow-hidden rounded-lg border">
      <li>
        <TinyLink href="/blog" label="Blog" isActive={!isNotes} />
      </li>
      <li>
        <TinyLink href="/blog/notes" label="Notes" isActive={isNotes} />
      </li>
    </ul>
  )
}
