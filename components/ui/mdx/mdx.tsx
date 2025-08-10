'use client'

import { MDXContent } from '@content-collections/mdx/react'
import { lazy, Suspense, useEffect, useMemo, type ComponentProps } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils/style'
import { usePolyglot } from '@/stores/use-polyglot'
import { Figure } from './figure'
import { Image } from './image'
import { Link } from './link'

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

const components = {
  img: Image,
  a: Link,
  figure: Figure,
  audio: SuspendedAudio,
}

interface MDXProps {
  contentCode: {
    de: string
    en: string
  }
  classname?: string
}

export function MDX({ contentCode, classname }: MDXProps) {
  const { language, setHasMultipleLanguage } = usePolyglot()

  const displayLanguage = useMemo(() => {
    return contentCode[language] ? language : 'en'
  }, [language, contentCode])

  const code = contentCode[displayLanguage]

  useEffect(() => {
    const hasMultipleLanguage = !!contentCode.de && !!contentCode.en
    setHasMultipleLanguage(hasMultipleLanguage)
  }, [contentCode, setHasMultipleLanguage])

  return (
    <div
      className={cn(
        classname,
        'prose prose-rosepine prose-strong:font-extrabold prose-strong:text-love prose-img:rounded-lg max-w-none',
      )}
      data-lang={displayLanguage}
    >
      <MDXContent components={components} code={code} />
    </div>
  )
}
