import type { ComponentPropsWithoutRef } from 'react'
import { PhotoView } from '@/components/photo-view'

export type ImageProps = {
  originalsrc: string
  showCaption?: boolean
} & ComponentPropsWithoutRef<'img'>

export function Image(props: ImageProps) {
  return <PhotoView {...props} />
}
