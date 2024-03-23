'use client'

import type { ImageProps } from 'next/image'
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import clsx from 'clsx'
import NextImage from 'next/image'
import { useState } from 'react'
import { PhotoView } from '@/components/PhotoView'

export default function Image(
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) {
  const [isReady, setIsReady] = useState(false)

  return (
    <>
      <PhotoView src={props.src as string}>
        <NextImage
          {...(props as ImageProps)}
          priority
          alt={props.alt ?? ''}
          onLoadingComplete={() => setIsReady(true)}
          onError={() => setIsReady(false)}
          className={clsx(
            'opacity-0 transition-opacity duration-500',
            isReady && 'opacity-100',
          )}
        />
      </PhotoView>
      {props.alt && (
        <span className="-mt-6 mb-8 block text-center italic">
          ◭ {props.alt}
        </span>
      )}
    </>
  )
}
