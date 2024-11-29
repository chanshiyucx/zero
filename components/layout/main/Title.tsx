import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import deconstructedRobotBroDark from '@/assets/images/deconstructed-robot-bro-dark.svg'
import deconstructedRobotBroLight from '@/assets/images/deconstructed-robot-bro-light.svg'
import { TypedWriter } from './TypedWriter'

export function Title() {
  return (
    <div className="flex h-fit w-full flex-col gap-24">
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

      <button className="group flex w-full items-center justify-center gap-1 text-sm tracking-widest opacity-60 hover:opacity-100 active:opacity-100">
        <span>Press</span>
        <kbd className="tracking-normal">Ctrl K</kbd>
        <span>Click</span>
        <span>to explore</span>
        <ArrowRight
          size="1em"
          weight="bold"
          className="-translate-x-full opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </button>
    </div>
  )
}
