'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
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
        'absolute top-0 right-0 flex items-center rounded-bl-lg p-2 leading-none duration-300 group-hover:opacity-100',
        isCopied ? 'bg-overlay' : 'bg-base cursor-pointer opacity-0',
      )}
    >
      {isCopied ? <CheckIcon size="1em" /> : <CopyIcon size="1em" />}
    </button>
  )
}
