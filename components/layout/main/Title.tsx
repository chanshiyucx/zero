import Image from 'next/image'
import deconstructedRobotBroDark from '@/assets/images/deconstructed-robot-bro-dark.svg'
import deconstructedRobotBroLight from '@/assets/images/deconstructed-robot-bro-light.svg'
import { Expore } from './Explore'
import { TypedWriter } from './TypedWriter'

export function Title() {
  return (
    <div className="flex h-fit w-full flex-col gap-20">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-4">
          <span className="text-6xl font-bold drop-shadow-lg">Reverie,</span>
          <span className="min-h-9 text-2xl text-subtle">
            <TypedWriter />
          </span>
        </div>
        <div>
          <Image
            src={deconstructedRobotBroLight}
            alt="Deconstructed Robot Light"
            className="w-72 dark:hidden"
            priority
          />
          <Image
            src={deconstructedRobotBroDark}
            alt="Deconstructed Robot Dark"
            className="hidden w-72 dark:block"
            priority
          />
        </div>
      </div>

      <Expore />
    </div>
  )
}
