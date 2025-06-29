import { MapTrifoldIcon } from '@phosphor-icons/react/dist/ssr'
import { useCommandStore } from '@/store/command'

export function Map() {
  const { toggle } = useCommandStore()

  return (
    <button
      onClick={toggle}
      aria-label="Open menu"
      className="hidden text-sm max-md:block"
    >
      <MapTrifoldIcon weight="duotone" className="text-xl" />
    </button>
  )
}
