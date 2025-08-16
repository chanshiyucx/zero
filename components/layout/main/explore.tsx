'use client'

import { ArrowRightIcon, CommandIcon } from '@phosphor-icons/react/dist/ssr'
import { StaggeredFadeInItem } from '@/components/ui/stagger'
import { useCommand } from '@/stores/use-command'

export function Explore() {
  const { toggle } = useCommand()

  return (
    <StaggeredFadeInItem
      as="button"
      onClick={toggle}
      aria-label="Open menu"
      className="group flex w-full items-center justify-center gap-1 text-sm tracking-widest opacity-60 hover:opacity-100 active:opacity-100"
    >
      <span className="inline-block max-md:hidden">Press</span>
      <kbd className="flex tracking-normal max-md:hidden">
        <CommandIcon size="1em" weight="bold" /> K
      </kbd>
      <span className="hidden max-md:inline-block">Click</span>
      <span>to explore</span>
      <ArrowRightIcon
        size="1em"
        weight="bold"
        className="-translate-x-full opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100 max-md:translate-x-0 max-md:opacity-100"
      />
    </StaggeredFadeInItem>
  )
}
