import Image from 'next/image'
import deconstructedRobotBroDark from '@/assets/images/deconstructed-robot-bro-dark.svg'
import deconstructedRobotBroLight from '@/assets/images/deconstructed-robot-bro-light.svg'
import { Expore } from './Explore'
import { TypedWriter } from './TypedWriter'

export function Title() {
  return (
    <div className="flex h-fit w-full flex-col gap-20">
      <div className="relative flex items-center justify-between max-md:justify-center">
        <div className="flex flex-col items-start gap-4">
          <span className="text-6xl font-bold drop-shadow-lg">Reverie,</span>
          <span className="min-h-9 text-2xl text-subtle">
            <TypedWriter />
          </span>
        </div>
        <div className="-z-10 w-72 max-md:absolute max-md:left-1/2 max-md:top-1/2 max-md:z-0 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:opacity-10">
          <Image
            src={deconstructedRobotBroLight}
            alt="Deconstructed Robot Light"
            className="dark:hidden"
            priority
          />
          <Image
            src={deconstructedRobotBroDark}
            alt="Deconstructed Robot Dark"
            className="hidden dark:block"
            priority
          />
        </div>
      </div>

      <Expore />
    </div>
  )
}
