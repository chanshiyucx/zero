'use client'

import type { PhotoProviderBase } from 'react-photo-view/dist/types'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { PhotoProvider } from '@/components/PhotoView'

const photoViewConfig: PhotoProviderBase = {
  maskOpacity: 1,
  maskClassName: 'photo-view-mask',
  bannerVisible: false,
  photoClosable: true,
  pullClosable: true,
}

export default function Template({ children }: { children: React.ReactNode }) {
  const [fade, setFade] = useState(false)
  useEffect(() => {
    setFade(true)
    return () => setFade(false)
  }, [])

  return (
    <PhotoProvider {...photoViewConfig}>
      <div
        className={clsx(
          fade ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
          'max-w-screen-lg flex-1 transition duration-500 ease-out',
        )}
      >
        {children}
      </div>
    </PhotoProvider>
  )
}
