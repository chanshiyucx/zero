import { useMDXComponent } from 'next-contentlayer/hooks'
import { FC } from 'react'
import Image from './Image'

interface MDXProps {
  code: string
}

const MDX: FC<MDXProps> = ({ code }) => {
  const Component = useMDXComponent(code)

  return (
    <div className="prose max-w-none">
      <Component
        components={{
          img: Image,
        }}
      />
    </div>
  )
}

export default MDX
