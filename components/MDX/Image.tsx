import type { ImageProps } from 'next/image'
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import NextImage from 'next/image'
import { PhotoView } from '@/components/PhotoView'

const Image = (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  return (
    <>
      <PhotoView src={props.src}>
        <NextImage {...(props as ImageProps)} alt={props.alt ?? ''} />
      </PhotoView>
      {props.alt && <span className="mb-8 block text-center italic">◭ {props.alt}</span>}
    </>
  )
}

export default Image
