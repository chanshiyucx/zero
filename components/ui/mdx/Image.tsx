'use client'

import type { ImageProps } from 'next/image'
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import clsx from 'clsx'
import NextImage from 'next/image'
import { useState } from 'react'
import { PhotoView } from '@/components/ui/photo-view'
import { Spinner } from '@/components/ui/spinner'

export function Image(
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { originalsrc?: string },
) {
  const [isReady, setIsReady] = useState(false)
  const originalsrc = props.originalsrc ?? props.src

  return (
    <>
      <PhotoView src={originalsrc}>
        <span className="relative block">
          <NextImage
            {...(props as ImageProps)}
            priority={false}
            alt={props.alt ?? ''}
            onLoad={() => setIsReady(true)}
            onError={() => setIsReady(false)}
            className={clsx(
              'transition-opacity duration-500',
              isReady ? 'opacity-100' : 'opacity-0',
            )}
          />
          <span className="absolute inset-0 -z-10 flex items-center justify-center rounded-lg bg-overlay">
            <Spinner />
          </span>
        </span>
      </PhotoView>
      {props.alt && (
        <span className="alt -mt-5 block text-center text-sm italic text-subtle">
          ◭ {props.alt}
        </span>
      )}
    </>
  )
}
