'use client'

import { usePolyglot } from '@/stores/use-polyglot'
import { TinyButton } from './tiny-button'

export function Polyglot() {
  const { language, toggleLanguage, hasMultipleLanguage } = usePolyglot()

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
