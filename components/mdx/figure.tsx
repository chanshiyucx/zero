import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils/style'
import { CopyButton } from './copy-button'

const LanguageMap = {
  typescript: 'TS',
  javascript: 'JS',
  python: 'PY',
  shell: 'SH',
} as const

type FigureProps = ComponentPropsWithoutRef<'figure'> & {
  children: ReactNode
  raw?: string
  caption?: string
  'data-rehype-pretty-code-figure'?: boolean
  'data-language'?: string
}

function Language({ language }: { language: string }) {
  const languageText = (
    LanguageMap[language as keyof typeof LanguageMap] ?? language
  ).toUpperCase()
  return (
    <span className="bg-base absolute right-0 bottom-0 rounded-tl-md p-2 text-xs leading-none uppercase">
      {languageText}
    </span>
  )
}

export function Figure({ children, raw, className, ...rest }: FigureProps) {
  const showCopyButton = raw && 'data-rehype-pretty-code-figure' in rest
  const language = rest['data-language']

  return (
    <figure className={cn('group relative', className)} {...rest}>
      {children}
      {showCopyButton && <CopyButton text={raw} />}
      {language && <Language language={language} />}
    </figure>
  )
}
