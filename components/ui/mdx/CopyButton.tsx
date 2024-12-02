'use client'

import { Check, Copy } from '@phosphor-icons/react/dist/ssr'
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
      className={`absolute bottom-0 right-0 flex items-center gap-1 rounded-tl-lg p-2 leading-none hover:opacity-100 active:opacity-100 ${
        isCopied
          ? 'bg-green-100/40 text-green-800 opacity-100 dark:bg-green-300/10 dark:text-green-500'
          : 'cursor-pointer bg-neutral-300 text-neutral-600 opacity-40 dark:bg-neutral-800 dark:text-neutral-400'
      }`}
    >
      {isCopied ? <Check size="1em" /> : <Copy size="1em" />}
    </button>
  )
}
