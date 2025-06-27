'use client'

import type { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { CommandProvider } from '@/components/layout/command'
import { PolyglotProvider } from '@/components/layout/polyglot'
import { PhotoProvider, photoViewConfig } from '@/components/ui/photo-view'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="light">
      <CommandProvider>
        <PolyglotProvider>
          <PhotoProvider {...photoViewConfig}>{children}</PhotoProvider>
        </PolyglotProvider>
      </CommandProvider>
    </ThemeProvider>
  )
}
