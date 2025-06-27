'use client'

import { ReactNode } from 'react'
import { usePolyglotStore } from '@/store/polyglot'

interface PolyglotContentWrapperProps {
  children: ReactNode
  hasMultipleLanguages: boolean
  defaultLang: 'de' | 'en'
}

export function PolyglotWrapper({
  children,
  hasMultipleLanguages,
}: PolyglotContentWrapperProps) {
  const { language } = usePolyglotStore()

  if (!hasMultipleLanguages) {
    return <div>{children}</div>
  }

  return (
    <div data-active-lang={language} className="polyglot">
      {children}
    </div>
  )
}
