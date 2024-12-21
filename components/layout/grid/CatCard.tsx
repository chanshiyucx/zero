import { Cat } from '@/components/ui/cat'
import { Ripple } from '@/components/ui/ripple'

export function CatCard() {
  return (
    <div className="card relative h-36 w-full bg-surface">
      <Ripple />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Cat size={120} />
      </div>
    </div>
  )
}
