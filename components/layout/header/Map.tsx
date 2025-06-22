import { MapTrifoldIcon } from '@phosphor-icons/react/dist/ssr'
import { useCommandProvider } from '@/components/layout/command'

export function Map() {
  const { toggle } = useCommandProvider()

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
