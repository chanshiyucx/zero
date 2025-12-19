import type { ComponentPropsWithoutRef } from 'react'
import { PhotoView } from '@/components/photo-view'

export interface ImageProps extends ComponentPropsWithoutRef<'img'> {
  originalsrc: string
}

export function Image(props: ImageProps) {
  return <PhotoView {...props} />
}
