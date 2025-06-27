'use client'

import { usePathname } from 'next/navigation'
import { usePolyglot } from '@/components/layout/polyglot'
import { TinyButton } from './TinyButton'

export function Polyglot() {
  const { language, toggleLanguage } = usePolyglot()
  const pathname = usePathname()

  const isPolyglot = pathname.startsWith('/polyglot/')
  if (!isPolyglot) return null

  return (
    <TinyButton onClick={toggleLanguage}>
      {language === 'de' ? 'DE' : 'EN'}
    </TinyButton>
  )
}
