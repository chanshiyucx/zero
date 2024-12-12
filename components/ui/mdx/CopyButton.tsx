'use client'

import { Check, Copy } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import { useState } from 'react'

interface CopyButtonProps {
  text: string
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 5000)
  }

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      aria-label="Copy"
      className={clsx(
        'absolute right-0 top-0 flex items-center rounded-bl-lg p-2 leading-none opacity-0 transition-all duration-300 group-hover:opacity-100 active:opacity-100',
        isCopied ? 'bg-overlay' : 'cursor-pointer bg-base',
      )}
    >
      {isCopied ? <Check size="1em" /> : <Copy size="1em" />}
    </button>
  )
}
