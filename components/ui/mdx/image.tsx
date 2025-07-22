'use client'

import type { ImageProps } from 'next/image'
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { CameraIcon, SlideshowIcon } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import NextImage from 'next/image'
import { useState } from 'react'
import { PhotoView } from '@/components/ui/photo-view'
import { Spinner } from '@/components/ui/spinner'

export function Image(
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { originalsrc: string },
) {
  const [isReady, setIsReady] = useState(false)
  const isAlum = Boolean(props.originalsrc)
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
          <span className="bg-overlay absolute inset-0 -z-10 flex items-center justify-center rounded-lg">
            <Spinner />
          </span>
        </span>
      </PhotoView>
      {props.alt && (
        <span className="text-subtle my-2 block text-center text-sm italic">
          {isAlum ? (
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
