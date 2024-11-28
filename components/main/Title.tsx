import Image from 'next/image'
import deconstructedRobotBroDark from './deconstructed-robot-bro-dark.svg'
import deconstructedRobotBroLight from './deconstructed-robot-bro-light.svg'
import { Typewriter } from './typewriter'

export default function Title() {
  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-between">
      <div className="absolute -z-50 h-64 w-64 bg-[conic-gradient(transparent,rgb(0,0,0))] opacity-15 blur-2xl md:left-36 dark:bg-[conic-gradient(transparent,rgb(255,255,255))]" />

      <div className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 opacity-10 md:hidden dark:opacity-5">
        <Image
          src={deconstructedRobotBroLight}
          alt="Deconstructed Robot Light"
          className="w-96 object-cover dark:hidden"
        />
        <Image
          src={deconstructedRobotBroDark}
          alt="Deconstructed Robot Dark"
          className="hidden w-96 dark:block"
        />
      </div>

      <div className="flex w-full items-center gap-12 md:justify-between">
        <div className="flex w-full flex-col items-center gap-4 md:w-fit md:items-start">
          <span className="w-min text-7xl font-bold text-black drop-shadow-2xl md:w-max dark:text-neutral-50">
            Mateus Felipe,
          </span>
          <span className="flex w-full items-center justify-center text-center text-2xl text-neutral-400 md:min-h-fit md:justify-start md:text-left md:text-3xl">
            <Typewriter
              words={[
                'Tech stuff enthusiast',
                'Nature admirer',
                'Enjoyer of good books',
                'Full stack developer',
              ]}
              cursor
              loop
            />
          </span>
        </div>
        <div className="hidden flex-1 items-center justify-end md:flex">
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
