import { MapTrifold } from '@phosphor-icons/react/dist/ssr'
import { useKBar } from 'kbar'

export function Map() {
  const {
    query: { toggle },
  } = useKBar()

  return (
    <button
      onClick={toggle}
      aria-label="Open menu"
      className="hidden text-sm max-md:block"
    >
      <MapTrifold weight="duotone" className="text-xl" />
    </button>
  )
}
