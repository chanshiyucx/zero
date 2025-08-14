import { Logo } from '@/components/ui/logo'
import { StaggeredFadeInItem } from '@/components/ui/stagger'
import { random } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'
import { Explore } from './explore'
import { TypedWriter } from './typed-writer'

export function Main() {
  const action = random(0, 1) === 0 ? 'walk' : 'run'

  return (
    <StaggeredFadeInItem className="flex h-fit w-full flex-col gap-20 max-md:gap-12">
      <div className="relative flex items-center justify-between max-md:justify-center">
        <div className="flex flex-col items-start gap-4 max-md:absolute max-md:top-1/2 max-md:left-1/2 max-md:-translate-1/2">
          <Logo />

          <div className="text-subtle min-h-9 text-2xl whitespace-nowrap italic">
            <TypedWriter />
          </div>
        </div>
        <div className="h-36 w-72 max-md:opacity-10">
          <div className={cn('city-cat', action)}></div>
        </div>
      </div>
      <Explore />
    </StaggeredFadeInItem>
  )
}
