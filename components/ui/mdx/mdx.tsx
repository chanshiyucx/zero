import { MDXContent } from '@content-collections/mdx/react'
import { lazy, Suspense, type ComponentProps } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { StaggeredFadeInWrap } from '@/components/ui/stagger'
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
      <div className="bg-surface flex h-20 items-center justify-center rounded-lg">
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
  classname?: string
  components?: MDXComponents
}

export function MDX({ contentCode, classname, components }: MDXProps) {
  const mergedComponents = {
    ...defaultComponents,
    ...components,
  }

  return (
    <div
      className={cn(
        classname,
        'prose prose-rosepine prose-strong:font-extrabold prose-strong:text-love prose-img:rounded-lg max-w-none',
      )}
      data-lang={'en'}
    >
      <StaggeredFadeInWrap>
        <MDXContent components={mergedComponents} code={contentCode} />
      </StaggeredFadeInWrap>
    </div>
  )
}
