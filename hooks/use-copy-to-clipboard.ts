import { useCallback, useState } from 'react'

interface UseCopyToClipboardOptions {
  timeout?: number
  onCopy?: () => void
}

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: UseCopyToClipboardOptions) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = useCallback(
    async (value: string) => {
      if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
        console.warn('Clipboard API not supported.')
        return
      }

      if (!value) {
        console.warn('No value provided to copy.')
        return
      }

      try {
        await navigator.clipboard.writeText(value)
        setIsCopied(true)

        if (onCopy) {
          onCopy()
        }

        setTimeout(() => {
          setIsCopied(false)
        }, timeout)
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
      }
    },
    [timeout, onCopy],
  )

  return { isCopied, copyToClipboard }
}
