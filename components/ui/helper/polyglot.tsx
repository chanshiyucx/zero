'use client'

import { usePolyglotStore } from '@/stores'
import { TinyButton } from './tiny-button'

export function Polyglot() {
  const { language, toggleLanguage, hasMultipleLanguage } = usePolyglotStore()

  return (
    <TinyButton
      show={hasMultipleLanguage}
      onClick={toggleLanguage}
      label="Switch Language"
    >
      {language === 'de' ? 'DE' : 'EN'}
    </TinyButton>
  )
}
