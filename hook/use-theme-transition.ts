import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { transitionViewIfSupported } from '@/lib/utils/dom'

export const Theme = {
  Light: 'light',
  Dark: 'dark',
}

export function useThemeTransition() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = useCallback(() => {
    transitionViewIfSupported(() => {
      flushSync(() =>
        setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light),
      )
    })
  }, [theme, setTheme])

  return {
    theme,
    toggleTheme,
  }
}
