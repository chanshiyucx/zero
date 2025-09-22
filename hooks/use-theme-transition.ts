import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { transitionViewIfSupported } from '@/lib/utils/dom'

export const Theme = {
  Light: 'light',
  Dark: 'dark',
}

export function useThemeTransition() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    transitionViewIfSupported(() => {
      flushSync(() =>
        setTheme(resolvedTheme === Theme.Light ? Theme.Dark : Theme.Light),
      )
    })
  }, [resolvedTheme, setTheme])

  return {
    theme,
    resolvedTheme,
    toggleTheme,
  }
}
