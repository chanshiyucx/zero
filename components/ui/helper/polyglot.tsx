'use client'

import { usePolyglotStore } from '@/stores'
import { TinyButton } from './tiny-button'

export function Polyglot() {
  const { language, toggleLanguage, hasMultipleLanguage } = usePolyglotStore()
  if (!hasMultipleLanguage) return null

  return (
    <TinyButton onClick={toggleLanguage}>
      {language === 'de' ? 'DE' : 'EN'}
    </TinyButton>
  )
}
