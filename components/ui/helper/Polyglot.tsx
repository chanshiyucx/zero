'use client'

import { usePathname } from 'next/navigation'
import { usePolyglotStore } from '@/store/polyglot'
import { TinyButton } from './tiny-button'

export function Polyglot() {
  const { language, toggleLanguage } = usePolyglotStore()
  const pathname = usePathname()

  const isPolyglot = pathname.startsWith('/polyglot/')
  if (!isPolyglot) return null

  return (
    <TinyButton onClick={toggleLanguage}>
      {language === 'de' ? 'DE' : 'EN'}
    </TinyButton>
  )
}
