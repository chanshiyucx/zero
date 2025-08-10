import { Logo } from '@/components/ui/logo'
import { random } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'
import { Explore } from './explore'
import { TypedWriter } from './typed-writer'

export function Main() {
  const action = random(0, 1) === 0 ? 'walk' : 'run'

  return (
    <div className="flex h-fit w-full flex-col gap-20 max-md:gap-12">
      <div className="relative flex items-center justify-between max-md:justify-center">
        <div className="z-10 flex flex-col items-start gap-4">
          <Logo />

          <div className="text-subtle min-h-9 text-2xl italic">
            <TypedWriter />
          </div>
        </div>
        <div className="relative h-36 w-72 max-md:absolute max-md:top-1/2 max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:opacity-10">
          <div className={cn('city-cat', action)}></div>
        </div>
      </div>
      <Explore />
    </div>
  )
}
