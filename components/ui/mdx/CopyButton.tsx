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
      className={`absolute bottom-0 right-0 flex items-center gap-1 rounded-tl-lg p-2 leading-none hover:bg-overlay active:bg-overlay ${
        isCopied ? 'bg-overlay' : 'cursor-pointer bg-base text-subtle'
      }`}
    >
      {isCopied ? <Check size="1em" /> : <Copy size="1em" />}
    </button>
  )
}
