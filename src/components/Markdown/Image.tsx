import React, { useState, useLayoutEffect } from 'react'
import { ComponentPropsWithoutRef, ComponentType, ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import clsx from 'clsx'
import Spinner from '@/components/Spinner'
import { fileCDN } from '@/utils'
import { useLoading } from '@/utils/hook'

type ImageProps = ComponentPropsWithoutRef<'img'> & ReactMarkdownProps

type ImageComponent = ComponentType<ImageProps>

const Image: ImageComponent = ({ src = '', alt = '' }) => {
  const [cdnSrc] = useState<string>(() => fileCDN(src))
  const [loading, setloading] = useState(true)
  const delay = useLoading()

  useLayoutEffect(() => {
    const img = new window.Image()
    img.onload = async () => {
      await delay()
      setloading(false)
    }
    img.src = cdnSrc
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cdnSrc])

  return (
    <>
      <img className={clsx('img-zoomable m-auto fade rounded shadow-md', loading && 'hidden')} src={loading ? "" : cdnSrc} alt={alt} />
      {loading && <Spinner />}
      {alt && <span className="block mt-2 text-center italic">◭ {alt}</span>}
    </>
  )
}

export default Image
