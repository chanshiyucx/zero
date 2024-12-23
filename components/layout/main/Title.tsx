import { random } from '@/lib/utils/helper'
import { Explore } from './Explore'
import { TypedWriter } from './TypedWriter'

export function Title() {
  const cat = random(0, 1) === 0 ? 'walk-cat' : 'run-cat'

  return (
    <div className="flex h-fit w-full flex-col gap-20">
      <div className="relative flex items-center justify-between max-md:justify-center">
        <div className="z-10 flex flex-col items-start gap-4">
          <h1 className="text-6xl font-bold drop-shadow-lg">Reverie,</h1>
          <div className="min-h-9 text-2xl text-subtle">
            <TypedWriter />
          </div>
        </div>
        <div className="relative h-36 w-72 max-md:absolute max-md:left-1/2 max-md:top-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:opacity-10">
          <div className={cat}></div>
        </div>
      </div>
      <Explore />
    </div>
  )
}
