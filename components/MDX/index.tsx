import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from './Image'

const components = {
  Image,
}

interface MDXProps {
  code: string
}

export default function MDX({ code }: MDXProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="prose-lg max-w-full">
      <Component components={components} />
    </div>
  )
}
