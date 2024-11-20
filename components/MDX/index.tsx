import { useMDXComponent } from '@content-collections/mdx/react'
import Image from './Image'

const components = {
  img: Image,
}

interface MDXProps {
  code: string
}

export default function MDX({ code }: MDXProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="prose prose-zinc max-w-none overflow-x-hidden text-justify md:prose-lg dark:prose-invert prose-img:rounded">
      <Component components={components} />
    </div>
  )
}
