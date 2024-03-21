import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from './Image'

interface MDXProps {
  code: string
}

export default function MDX({ code }: MDXProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="prose-lg max-w-full">
      <Component
        components={{
          img: Image,
        }}
      />
    </div>
  )
}
