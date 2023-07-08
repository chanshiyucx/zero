'use client'

import type { ImageProps } from 'next/image'
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import clsx from 'clsx'
import NextImage from 'next/image'
import { useState } from 'react'
import { PhotoView } from '@/components/PhotoView'
import Spinner from '@/components/Spinner'

const Image = (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  const [isReady, setIsReady] = useState(false)

  return (
    <>
      <PhotoView src={props.src}>
        <NextImage
          {...(props as ImageProps)}
          priority
          alt={props.alt ?? ''}
          onLoadingComplete={() => setIsReady(true)}
          onError={() => setIsReady(false)}
          className={clsx('opacity-0 transition-opacity duration-500', isReady && 'opacity-100')}
        />
      </PhotoView>
      {!isReady && <Spinner />}
      {props.alt && <span className="mb-8 block text-center italic">◭ {props.alt}</span>}
    </>
  )
}

export default Image
