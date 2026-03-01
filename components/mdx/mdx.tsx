import { MDXContent } from '@content-collections/mdx/react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils/style'
import { Figure } from './figure'
import { Image } from './image'
import { Link } from './link'

type MDXComponents = ComponentProps<typeof MDXContent>['components']

const defaultComponents: MDXComponents = {
  img: Image,
  a: Link,
  figure: Figure,
}

interface MDXProps {
  contentCode: string
  className?: string
  components?: MDXComponents
  slideMode?: 'manual' | 'auto' | 'none'
}

export function MDX({
  contentCode,
  className,
  components,
  slideMode = 'manual',
}: MDXProps) {
  const mergedComponents = {
    ...defaultComponents,
    ...components,
  }

  const slideProps =
    slideMode === 'none'
      ? {}
      : slideMode === 'manual'
        ? { 'data-slide': '' }
        : { 'data-slide-auto': '' }

  return (
    <div
      className={cn(
        'prose prose-rosepine prose-strong:font-extrabold prose-strong:text-love prose-img:rounded-md w-full max-w-none min-w-px',
        className,
      )}
      data-lang={'en'}
      {...slideProps}
    >
      <MDXContent components={mergedComponents} code={contentCode} />
    </div>
  )
}
