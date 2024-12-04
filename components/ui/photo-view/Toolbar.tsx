import type { OverlayRenderProps } from 'react-photo-view/dist/types'
import {
  CornersIn,
  CornersOut,
  IconProps,
  MinusCircle,
  PlusCircle,
} from '@phosphor-icons/react'
import { toggleFullscreen } from '@/lib/screen'

const commonProps: IconProps = {
  size: 44,
  weight: 'bold',
  className: 'opacity-75 p-2.5 cursor-pointer',
}

export function Toolbar({ onScale, scale }: OverlayRenderProps) {
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
}
