import { MapTrifoldIcon } from '@phosphor-icons/react/dist/ssr'
import { useCommand } from '@/stores/use-command'

export function Map() {
  const { toggle } = useCommand()

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
