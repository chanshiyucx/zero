import Image from 'next/image'
import deconstructedRobotBroDark from '@/assets/images/deconstructed-robot-bro-dark.svg'
import deconstructedRobotBroLight from '@/assets/images/deconstructed-robot-bro-light.svg'
import { TypedWriter } from './TypedWriter'

export function Title() {
  return (
    <div className="h-fit w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-4">
          <span className="text-6xl font-bold text-zinc-950 drop-shadow-lg dark:text-zinc-50">
            Reverie,
          </span>
          <span className="min-h-9 text-2xl text-zinc-500">
            <TypedWriter />
          </span>
        </div>
        <div>
          <Image
            src={deconstructedRobotBroLight}
            alt="Deconstructed Robot Light"
            className="w-72 dark:hidden"
          />
          <Image
            src={deconstructedRobotBroDark}
            alt="Deconstructed Robot Dark"
            className="hidden w-72 dark:block"
          />
        </div>
      </div>
    </div>
  )
}
