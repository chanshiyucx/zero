'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Explore } from './Explore'
import { TypedWriter } from './TypedWriter'

const ROBOT_IMAGES = {
  dark: '/assets/deconstructed-robot-bro-dark.svg',
  light: '/assets/deconstructed-robot-bro-light.svg',
}

export function Title() {
  const { theme } = useTheme()
  const imageSource = ROBOT_IMAGES[theme === 'dark' ? 'dark' : 'light']

  return (
    <div className="flex h-fit w-full flex-col gap-20">
      <div className="relative flex items-center justify-between max-md:justify-center">
        <div className="z-10 flex flex-col items-start gap-4">
          <h1 className="text-6xl font-bold drop-shadow-lg">Reverie,</h1>
          <div className="min-h-9 text-2xl text-subtle">
            <TypedWriter />
          </div>
        </div>
        <div className="relative h-72 w-72 max-md:absolute max-md:left-1/2 max-md:top-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:opacity-10">
          <Image
            src={imageSource}
            alt="Deconstructed Robot"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 288px"
          />
        </div>
      </div>
      <Explore />
    </div>
  )
}
