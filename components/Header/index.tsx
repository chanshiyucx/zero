'use client'

import Image from 'next/image'
import { FC } from 'react'
import Banner from '@/assets/images/banner.png'

const Header: FC = () => {
  return (
    <header className="relative px-2 py-6 md:px-16 md:py-12">
      <a
        href="/"
        className="z-10 md:absolute md:bottom-5 md:right-5 md:bg-lime-800 md:p-5 md:text-white"
      >
        <h1 className="text-2xl font-bold tracking-wider drop-shadow-md md:text-4xl ">
          人类绿洲。
        </h1>
        <p className="max-md:text-right max-md:text-sm max-md:italic">
          For shame and pride.
        </p>
      </a>
      <Image
        src={Banner}
        className="h-80 cursor-pointer object-cover object-bottom"
        alt="Banner of the page"
      />
    </header>
  )
}

export default Header
