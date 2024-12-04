import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { useKBar } from 'kbar'

export function Search() {
  const {
    query: { toggle },
  } = useKBar()

  return (
    <button
      onClick={toggle}
      className="flex cursor-text items-center gap-3 rounded-lg bg-surface p-2 text-sm outline-none"
    >
      <span className="flex items-center gap-3">
        <MagnifyingGlass size="1em" weight="bold" />
        Search...
      </span>
      <kbd>⌘ K</kbd>
    </button>
  )
}
