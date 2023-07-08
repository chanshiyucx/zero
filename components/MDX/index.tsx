import type { ImageProps } from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import { FC } from 'react'
import { PhotoView } from '@/components/PhotoView'

interface MDXProps {
  code: string
}

const MDX: FC<MDXProps> = ({ code }) => {
  const Component = useMDXComponent(code)

  return (
    <div className="prose max-w-none">
      <Component
        components={{
          img: (props) => {
            return (
              <>
                <PhotoView src={props.src}>
                  <Image {...(props as ImageProps)} alt={props.alt ?? ''} />
                </PhotoView>
                {props.alt && <span className="mb-8 block text-center italic">◭ {props.alt}</span>}
              </>
            )
          },
        }}
      />
    </div>
  )
}

export default MDX
