'use client'

import type { PropsWithChildren } from 'react'
// import type { PhotoProviderBase } from 'react-photo-view/dist/types'
// import { MinusCircle, PlusCircle } from '@phosphor-icons/react'
import { ThemeProvider } from 'next-themes'
import { CustomKBarProvider } from '@/components/layout/kbar/provider'
import { PhotoProvider, photoViewConfig } from '@/components/ui/photo-view'

// import { Spinner } from '@/components/ui/spinner'
// import { isFullScreen, toggleFullscreen } from '@/lib/screen'

// const photoViewConfig: PhotoProviderBase = {
//   maskOpacity: 1,
//   maskClassName: 'photo-view-mask',
//   bannerVisible: true,
//   photoClosable: true,
//   pullClosable: true,
//   loadingElement: <Spinner size="large" />,
//   toolbarRender: ({ onScale, scale }) => {
//     return (
//       <>
//         <PlusCircle onClick={() => onScale(scale + 1)} />
//         <MinusCircle onClick={() => onScale(scale - 1)} />
//         <MinusCircle onClick={toggleFullscreen} />
//       </>
//     )
//   },
// }

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <CustomKBarProvider>
        <PhotoProvider {...photoViewConfig}>{children}</PhotoProvider>
      </CustomKBarProvider>
    </ThemeProvider>
  )
}
