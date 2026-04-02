import { MDXContent } from '@content-collections/mdx/react'
import type { ComponentProps, ReactNode } from 'react'
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

type MDXProps = {
  contentCode: string
  className?: string
  components?: MDXComponents
  slideStart?: number
  after?: ReactNode
  innerPhotoCaption?: boolean
}

export function MDX({
  contentCode,
  className,
  components,
  slideStart = -1,
  after,
  innerPhotoCaption = true,
}: MDXProps) {
  const mergedComponents = {
    ...defaultComponents,
    ...components,
  }

  const slideProps =
    slideStart >= 0
      ? {
          'data-slide-auto': true,
          'data-slide-start': slideStart,
        }
      : {}

  return (
    <div
      className={cn(
        'prose prose-rosepine prose-strong:font-extrabold prose-strong:text-love prose-img:rounded-md w-full max-w-none min-w-px',
        innerPhotoCaption && 'photo-caption',
        className,
      )}
      data-lang={'en'}
      {...slideProps}
    >
      <MDXContent components={mergedComponents} code={contentCode} />
      {after && <div className="not-prose mt-12">{after}</div>}
    </div>
  )
}
