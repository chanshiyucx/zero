import {
  CornersInIcon,
  CornersOutIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  type IconProps,
} from '@phosphor-icons/react'
import type { OverlayRenderProps } from 'react-photo-view/dist/types'
import { toggleFullscreen } from '@/lib/utils/screen'

const commonProps: IconProps = {
  size: 44,
  weight: 'bold',
  className: 'opacity-75 p-2.5 cursor-pointer',
}

export function Toolbar({ onScale, scale }: OverlayRenderProps) {
  const isFullScreen = document.fullscreenElement

  return (
    <>
      <PlusCircleIcon {...commonProps} onClick={() => onScale(scale + 1)} />
      <MinusCircleIcon {...commonProps} onClick={() => onScale(scale - 1)} />
      {isFullScreen ? (
        <CornersInIcon {...commonProps} onClick={toggleFullscreen} />
      ) : (
        <CornersOutIcon {...commonProps} onClick={toggleFullscreen} />
      )}
    </>
  )
}
