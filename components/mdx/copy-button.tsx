'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils/style'

export function CopyButton({ text }: { text: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 3000 })
  const handleCopy = () => copyToClipboard(text)

  return (
    <button
      disabled={isCopied}
      onClick={handleCopy}
      aria-label="Copy"
      className={cn(
        'bg-base absolute top-0 right-0 z-10 flex items-center rounded-bl-lg p-2 leading-none duration-300 group-hover:opacity-100',
        !isCopied && 'cursor-pointer opacity-0',
      )}
    >
      {isCopied ? <CheckIcon size="1em" /> : <CopyIcon size="1em" />}
    </button>
  )
}
