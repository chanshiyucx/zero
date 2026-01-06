import { MDXContent } from '@content-collections/mdx/react'
import { lazy, Suspense, type ComponentProps } from 'react'
import { Spinner } from '@/components/spinner'
import { cn } from '@/lib/utils/style'
import { Figure } from './figure'
import { Image } from './image'
import { Link } from './link'

export type MDXComponents = ComponentProps<typeof MDXContent>['components']

const LazyAudio = lazy(() =>
  import('./audio').then((module) => ({ default: module.Audio })),
)

const SuspendedAudio = (props: ComponentProps<typeof LazyAudio>) => (
  <Suspense
    fallback={
      <div className="bg-surface flex h-20 items-center justify-center rounded-md">
        <Spinner size="large" />
      </div>
    }
  >
    <LazyAudio {...props} />
  </Suspense>
)

const defaultComponents: MDXComponents = {
  img: Image,
  a: Link,
  figure: Figure,
  audio: SuspendedAudio,
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
