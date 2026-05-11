import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils/style'

const LanguageMap = {
  typescript: 'TS',
  javascript: 'JS',
  python: 'PY',
  shell: 'SH',
} as const

type FigureProps = ComponentPropsWithoutRef<'figure'> & {
  children: ReactNode
  caption?: string
  'data-rehype-pretty-code-figure'?: boolean
  'data-language'?: string
}

function Language({ language }: { language: string }) {
  const languageText = (
    LanguageMap[language as keyof typeof LanguageMap] ?? language
  ).toUpperCase()
  return (
    <span className="bg-base absolute top-0 right-0 rounded-bl-md p-2 text-xs leading-none uppercase duration-300 group-hover:opacity-0">
      {languageText}
    </span>
  )
}

export function Figure({ children, className, ...rest }: FigureProps) {
  const language = rest['data-language']

  return (
    <figure className={cn('group relative', className)} {...rest}>
      {children}
      {language && <Language language={language} />}
    </figure>
  )
}
