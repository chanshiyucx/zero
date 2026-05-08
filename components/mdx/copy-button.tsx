'use client'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils/style'

export function CopyButton({ text }: { text: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const handleCopy = () => copyToClipboard(text)

  return (
    <button
      disabled={isCopied}
      onClick={() => void handleCopy()}
      aria-label="Copy"
      className={cn(
        'bg-base absolute top-0 right-0 z-10 flex items-center rounded-bl-md p-2 text-xs leading-none uppercase duration-300 group-hover:opacity-100',
        !isCopied && 'cursor-pointer opacity-0',
      )}
    >
      {isCopied ? 'Copied' : 'Copy'}
    </button>
  )
}
