'use client'

import { AlignJustify } from 'lucide-react'

interface MenuProps {
  toggleMenu: () => void
}

export default function Menu({ toggleMenu }: MenuProps) {
  return (
    <button
      className="z-30 rounded-bl-full bg-zinc-800
            p-5 pr-2 pt-2 text-zinc-100
            max-md:fixed max-md:right-0 max-md:top-0 md:hidden"
      onClick={toggleMenu}
    >
      <AlignJustify size={18} />
    </button>
  )
}
