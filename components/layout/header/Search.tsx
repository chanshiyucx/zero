import {
  CommandIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react/dist/ssr'
import { useCommandProvider } from '@/components/layout/command'

export function Search() {
  const { toggle } = useCommandProvider()

  return (
    <button
      onClick={toggle}
      aria-label="Search"
      className="bg-surface flex cursor-text items-center gap-3 rounded-lg p-2 text-sm outline-hidden"
    >
      <span className="flex items-center gap-3">
        <MagnifyingGlassIcon size="1em" weight="bold" />
        Search...
      </span>
      <kbd>
        <CommandIcon size="1em" weight="bold" /> K
      </kbd>
    </button>
  )
}
