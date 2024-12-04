import 'react-photo-view/dist/react-photo-view.css'
import type { PhotoProviderBase } from 'react-photo-view/dist/types'
import {
  CornersIn,
  CornersOut,
  IconProps,
  MinusCircle,
  PlusCircle,
} from '@phosphor-icons/react'
import { Spinner } from '@/components/ui/spinner'
import { toggleFullscreen } from '@/lib/screen'

export { PhotoProvider, PhotoView } from 'react-photo-view'

const commonProps: IconProps = {
  size: 44,
  weight: 'bold',
  className: 'opacity-75 p-2.5 cursor-pointer',
}

export const photoViewConfig: PhotoProviderBase = {
  maskOpacity: 1,
  maskClassName: 'photo-view-mask',
  bannerVisible: true,
  photoClosable: true,
  pullClosable: true,
  loadingElement: <Spinner size="large" />,
  toolbarRender: ({ onScale, scale }) => {
    const isFullScreen = document.fullscreenElement
    return (
      <>
        <PlusCircle {...commonProps} onClick={() => onScale(scale + 1)} />
        <MinusCircle {...commonProps} onClick={() => onScale(scale - 1)} />
        {isFullScreen ? (
          <CornersIn {...commonProps} onClick={toggleFullscreen} />
        ) : (
          <CornersOut {...commonProps} onClick={toggleFullscreen} />
        )}
      </>
    )
  },
}
