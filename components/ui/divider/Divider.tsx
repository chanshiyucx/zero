import { Scissors } from '@phosphor-icons/react/dist/ssr'

export function Divider() {
  return (
    <div className="flex items-center justify-center gap-1">
      <Scissors size="1.5em" weight="bold" className="text-muted" />
      <hr className="hr-twill" />
    </div>
  )
}
