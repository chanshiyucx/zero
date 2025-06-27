'use client'

import { ReactNode } from 'react'
import { usePolyglot } from '@/components/layout/polyglot'

interface PolyglotContentWrapperProps {
  children: ReactNode
  hasMultipleLanguages: boolean
  defaultLang: 'de' | 'en'
}

export function PolyglotWrapper({
  children,
  hasMultipleLanguages,
}: PolyglotContentWrapperProps) {
  const { language } = usePolyglot()

  if (!hasMultipleLanguages) {
    return <div>{children}</div>
  }

  return (
    <div data-active-lang={language} className="polyglot">
      {children}
    </div>
  )
}
