// import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
// import { useKBar } from 'kbar'
// import { Search as SearchIcon } from 'lucide-react'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'

export default function Search() {
  //   const {
  // query: { toggle },
  //   } = useKBar()

  return (
    <button
      //   onClick={toggle}
      className="flex cursor-text items-center gap-3 rounded-lg bg-zinc-200/20 p-2 text-sm text-zinc-500 dark:bg-zinc-800/20"
    >
      <span className="flex items-center gap-3">
        <MagnifyingGlass size="1em" weight="bold" />
        Search...
      </span>
      <kbd>Ctrl K</kbd>
    </button>
  )
}
