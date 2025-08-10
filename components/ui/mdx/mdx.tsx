'use client'

import { MDXContent } from '@content-collections/mdx/react'
import { useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils/style'
import { usePolyglot } from '@/stores/use-polyglot'
import { Audio } from './audio'
import { Figure } from './figure'
import { Image } from './image'
import { Link } from './link'

const components = {
  img: Image,
  a: Link,
  figure: Figure,
  audio: Audio,
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
