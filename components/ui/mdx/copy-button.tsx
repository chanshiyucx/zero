'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import { useCopyToClipboard } from '@/hooks'

interface CopyButtonProps {
  text: string
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 5000 })
  const handleCopy = () => copyToClipboard(text)

  return (
    <button
      disabled={isCopied}
      onClick={handleCopy}
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
