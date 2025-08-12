'use client'

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
  return <PhotoView {...props} />
}
