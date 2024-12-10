import { MapTrifold } from '@phosphor-icons/react/dist/ssr'
import { useKBar } from 'kbar'

export function Map() {
  const {
    query: { toggle },
  } = useKBar()

  return (
    <button onClick={toggle} className="hidden text-sm max-md:block">
      <MapTrifold weight="duotone" className="text-xl" />
    </button>
  )
}
