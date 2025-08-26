'use client'

import { type ComponentPropsWithoutRef } from 'react'
import { PhotoView } from '@/components/ui/photo-view'

export interface ImageProps extends ComponentPropsWithoutRef<'img'> {
  originalsrc: string
}

export function Image(props: ImageProps) {
  return <PhotoView {...props} />
}
