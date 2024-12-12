'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Expore } from './Explore'
import { TypedWriter } from './TypedWriter'

export function Title() {
  const { theme } = useTheme()

  const imageSource =
    theme === 'dark'
      ? '/assets/deconstructed-robot-bro-dark.svg'
      : '/assets/deconstructed-robot-bro-light.svg'

  return (
    <div className="flex h-fit w-full flex-col gap-20">
      <div className="relative flex items-center justify-between max-md:justify-center">
        <div className="z-10 flex flex-col items-start gap-4">
          <span className="text-6xl font-bold drop-shadow-lg">Reverie,</span>
          <span className="min-h-9 text-2xl text-subtle">
            <TypedWriter />
          </span>
        </div>
        <div className="relative h-72 w-72 max-md:absolute max-md:left-1/2 max-md:top-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:opacity-10">
          <Image src={imageSource} alt="Deconstructed Robot" fill priority />
        </div>
      </div>
      <Expore />
    </div>
  )
}
