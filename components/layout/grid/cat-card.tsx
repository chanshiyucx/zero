import { Cat } from '@/components/ui/cat'
import { Ripple } from '@/components/ui/ripple'

export function CatCard() {
  return (
    <div className="bg-surface relative h-36 w-full overflow-hidden rounded-lg">
      <Ripple />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Cat size={120} />
      </div>
    </div>
  )
}
