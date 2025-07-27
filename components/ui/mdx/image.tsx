'use client'

import { CameraIcon, SlideshowIcon } from '@phosphor-icons/react/dist/ssr'
import { type DetailedHTMLProps, type ImgHTMLAttributes } from 'react'
import { PhotoView } from '@/components/ui/photo-view'

export interface ImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  originalsrc: string
}

export function Image(props: ImageProps) {
  const isAlbum = Boolean(props.originalsrc)

  return (
    <>
      <PhotoView {...props} />

      {props.alt && (
        <span className="text-subtle my-2 block text-center text-sm italic">
          {isAlbum ? (
            <CameraIcon weight="duotone" className="fill-subtle mr-1 inline" />
          ) : (
            <SlideshowIcon
              weight="duotone"
              className="fill-subtle mr-1 inline"
            />
          )}
          <span className="align-text-top">{props.alt}</span>
        </span>
      )}
    </>
  )
}
