import { useMDXComponent } from '@content-collections/mdx/react'
import clsx from 'clsx'
import { Figure } from './Figure'
import { Image } from './Image'
import { Link } from './Link'

const components = {
  img: Image,
  a: Link,
  figure: Figure,
}

interface MDXProps {
  code: string
  classname?: string
}

export function MDX({ code, classname }: MDXProps) {
  const Component = useMDXComponent(code)

  return (
    <div
      className={clsx(
        classname,
        'prose prose-rosepine max-w-none prose-strong:font-extrabold prose-strong:text-love prose-img:rounded-lg',
      )}
    >
      <Component components={components} />
    </div>
  )
}
