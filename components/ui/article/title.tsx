'use client'

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

  return <h1 className="text-4xl font-extrabold">{title}</h1>
}
