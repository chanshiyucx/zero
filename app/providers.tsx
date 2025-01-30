'use client'

import type { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { CommandProvider } from '@/components/layout/command'
import { PhotoProvider, photoViewConfig } from '@/components/ui/photo-view'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="light">
      <CommandProvider>
        <PhotoProvider {...photoViewConfig}>{children}</PhotoProvider>
      </CommandProvider>
    </ThemeProvider>
  )
}
