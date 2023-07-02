import type { ImageProps } from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import { FC } from 'react'

interface MDXProps {
  code: string
}

const MDX: FC<MDXProps> = ({ code }) => {
  const Component = useMDXComponent(code)

  return (
    <Component
      components={{
        img: (props) => {
          return <Image {...(props as ImageProps)} alt={props.alt ?? ''} />
        },
      }}
    />
  )
}

export default MDX
