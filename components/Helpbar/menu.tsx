'use client'

// import clsx from 'clsx'
// import { ArrowUpToLine } from 'lucide-react'
// import { useEffect, useState } from 'react'
// import { throttle } from '@/lib/lodash'

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
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="4" x2="20" y1="12" y2="12"></line>
        <line x1="4" x2="20" y1="6" y2="6"></line>
        <line x1="4" x2="20" y1="18" y2="18"></line>
      </svg>
    </button>
  )
}
