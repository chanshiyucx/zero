import { useMDXComponent } from '@content-collections/mdx/react'
import clsx from 'clsx'
import { Figure } from './figure'
import { Image } from './image'
import { Link } from './link'

const components = {
  img: Image,
  a: Link,
  figure: Figure,
}

interface MDXProps {
  code: string
  classname?: string
  lang?: 'en' | 'de'
}

export function MDX({ code, classname, lang }: MDXProps) {
  const Component = useMDXComponent(code)

  return (
    <div
      className={clsx(
        classname,
        'prose prose-rosepine prose-strong:font-extrabold prose-strong:text-love prose-img:rounded-lg max-w-none',
      )}
      data-lang={lang}
    >
      <Component components={components} />
    </div>
  )
}
