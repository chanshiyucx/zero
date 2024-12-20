import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from '@/components/icons'
import { useIsMounted } from '@/hook'
import { transitionViewIfSupported } from '@/lib/utils/dom'

const Theme = {
  Light: 'light',
  Dark: 'dark',
}

function useThemeTransition() {
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

export function TinyButton() {
  const { toggleTheme, theme } = useThemeTransition()
  const Icon = theme === Theme.Light ? Sun : Moon
  return (
    <button onClick={toggleTheme} aria-label="Switch theme">
      <Icon className="text-xl" />
    </button>
  )
}

export function ThemeSwitcher() {
  const mounted = useIsMounted()
  return <div className="flex w-5">{mounted && <TinyButton />}</div>
}
