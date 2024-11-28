'use client'

import type { PhotoProviderBase } from 'react-photo-view/dist/types'
import { ThemeProvider } from 'next-themes'
import { PhotoProvider } from '@/components/photo-view'

const photoViewConfig: PhotoProviderBase = {
  maskOpacity: 1,
  maskClassName: 'photo-view-mask',
  bannerVisible: false,
  photoClosable: true,
  pullClosable: true,
}

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider>
      <PhotoProvider {...photoViewConfig}>{children}</PhotoProvider>
    </ThemeProvider>
  )
}
