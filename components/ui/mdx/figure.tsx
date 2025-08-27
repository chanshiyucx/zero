'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import { type ComponentPropsWithoutRef } from 'react'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils/style'

const LanguageMap = {
  typescript: 'TS',
  javascript: 'JS',
  python: 'PY',
  shell: 'SH',
} as const

interface FigureProps extends ComponentPropsWithoutRef<'figure'> {
  raw?: string
  'data-rehype-pretty-code-figure'?: boolean
  'data-language'?: string
}

const CopyButton = ({ text }: { text: string }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 5000 })
  const handleCopy = () => copyToClipboard(text)

  return (
    <button
      disabled={isCopied}
      onClick={handleCopy}
      aria-label="Copy"
      className={cn(
        'bg-base absolute top-0 right-0 flex items-center rounded-bl-lg p-2 leading-none duration-300 group-hover:opacity-100',
        !isCopied && 'cursor-pointer opacity-0',
      )}
    >
      {isCopied ? <CheckIcon size="1em" /> : <CopyIcon size="1em" />}
    </button>
  )
}

const Language = ({ language }: { language: string }) => {
  const languageText = (
    LanguageMap[language as keyof typeof LanguageMap] ?? language
  ).toUpperCase()
  return (
    <span className="bg-base absolute right-0 bottom-0 rounded-tl-lg p-2 text-xs leading-none uppercase">
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
