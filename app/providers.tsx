'use client'

import type { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { CustomKBarProvider } from '@/components/layout/kbar'
import { PhotoProvider, photoViewConfig } from '@/components/ui/photo-view'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="light">
      <CustomKBarProvider>
        <PhotoProvider {...photoViewConfig}>{children}</PhotoProvider>
      </CustomKBarProvider>
    </ThemeProvider>
  )
}
