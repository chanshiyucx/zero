'use client'

import type { PhotoProviderBase } from 'react-photo-view/dist/types'
import { PhotoProvider } from '@/components/PhotoView'

const photoViewConfig: PhotoProviderBase = {
  maskOpacity: 1,
  maskClassName: 'photo-view-mask',
  bannerVisible: false,
  photoClosable: true,
  pullClosable: true,
}

export default function Template({ children }: { children: React.ReactNode }) {
  // if (
  //   localStorage.theme === 'dark' ||
  //   (!('theme' in localStorage) &&
  //     window.matchMedia('(prefers-color-scheme: dark)').matches)
  // ) {
  //   console.log('dark')
  //   document.documentElement.classList.add('dark')
  // } else {
  //   console.log('light')
  //   document.documentElement.classList.remove('dark')
  // }

  return <PhotoProvider {...photoViewConfig}>{children}</PhotoProvider>
}
