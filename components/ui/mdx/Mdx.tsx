import { useMDXComponent } from '@content-collections/mdx/react'
import { Image } from './Image'
import { Link } from './Link'

const components = {
  img: Image,
  a: Link,
}

interface MDXProps {
  code: string
}

export function MDX({ code }: MDXProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="prose prose-rosepine max-w-none overflow-x-hidden text-justify prose-img:rounded-lg">
      <Component components={components} />
    </div>
  )
}
