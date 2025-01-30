'use client'

import { ArrowRight, Command } from '@phosphor-icons/react/dist/ssr'
import { useCommandProvider } from '@/components/layout/command'

export function Explore() {
  const { toggle } = useCommandProvider()

  return (
    <button
      onClick={toggle}
      aria-label="Open menu"
      className="group flex w-full items-center justify-center gap-1 text-sm tracking-widest opacity-60 hover:opacity-100 active:opacity-100"
    >
      <span>Press</span>
      <kbd className="tracking-normal">
        <Command size="1em" weight="bold" /> K
      </kbd>
      <span>Click</span>
      <span>to explore</span>
      <ArrowRight
        size="1em"
        weight="bold"
        className="-translate-x-full opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </button>
  )
}
