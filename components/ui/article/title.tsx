'use client'

import { usePolyglotStore } from '@/stores/polyglot'

interface TitleProps {
  titleCode: {
    de: string
    en: string
  }
}

export function Title({ titleCode }: TitleProps) {
  const { language } = usePolyglotStore()
  const displayLanguage = titleCode[language] ? language : 'en'
  const title = titleCode[displayLanguage]

  return <h1 className="text-4xl font-extrabold">{title}</h1>
}
