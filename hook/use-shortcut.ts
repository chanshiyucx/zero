import { useCallback, useRef } from 'react'

export function useShortcut() {
  const shortcuts = useRef<Map<string, () => void>>(new Map())
  const keySequence = useRef<string[]>([])
  const keyTimeout = useRef<number | null>(null)

  const register = useCallback((shortcut: string[], action: () => void) => {
    if (shortcut && shortcut.length > 0) {
      const key = shortcut.join(',')
      shortcuts.current.set(key, action)
    }
  }, [])

  const handleKeypress = useCallback((key: string) => {
    if (keyTimeout.current) {
      clearTimeout(keyTimeout.current)
    }

    keySequence.current.push(key)
    const currentSequence = keySequence.current.join(',')

    if (shortcuts.current.has(currentSequence)) {
      const action = shortcuts.current.get(currentSequence)
      if (action) {
        action()
      }
      // keySequence.current = []
      // return
    }

    const hasPartialMatch = Array.from(shortcuts.current.keys()).some(
      (shortcut) => shortcut.startsWith(currentSequence + ','),
    )

    if (hasPartialMatch) {
      keyTimeout.current = window.setTimeout(() => {
        keySequence.current = []
      }, 1000)
    } else {
      keySequence.current = []
    }
  }, [])

  const clearSequence = useCallback(() => {
    keySequence.current = []
    if (keyTimeout.current) {
      clearTimeout(keyTimeout.current)
    }
  }, [])

  return { register, handleKeypress, clearSequence }
}
