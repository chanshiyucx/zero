import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'
import { transitionViewIfSupported } from '@/lib/utils/dom'

export const Theme = {
  Light: 'light',
  Dark: 'dark',
}

export function useThemeTransition() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    transitionViewIfSupported(() => {
      flushSync(() =>
        setTheme(resolvedTheme === Theme.Light ? Theme.Dark : Theme.Light),
      )
    })
  }

  return {
    theme,
    resolvedTheme,
    toggleTheme,
  }
}
