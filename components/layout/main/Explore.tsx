'use client'

import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { useKBar } from 'kbar'

export function Expore() {
  const {
    query: { toggle },
  } = useKBar()
  return (
    <button
      onClick={toggle}
      className="group flex w-full items-center justify-center gap-1 text-sm tracking-widest opacity-60 hover:opacity-100 active:opacity-100"
    >
      <span>Press</span>
      <kbd className="tracking-normal">⌘ K</kbd>
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
