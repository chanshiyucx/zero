'use client'

import { StaggeredFadeInItem } from '@/components/ui/stagger'
import { usePolyglot } from '@/stores/use-polyglot'

interface TitleProps {
  titleCode: {
    de: string
    en: string
  }
}

export function Title({ titleCode }: TitleProps) {
  const { language } = usePolyglot()
  const displayLanguage = titleCode[language] ? language : 'en'
  const title = titleCode[displayLanguage]

  return (
    <StaggeredFadeInItem as="h1" className="text-4xl font-extrabold">
      {title}
    </StaggeredFadeInItem>
  )
}
