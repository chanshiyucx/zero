import { Moon, Sun } from '@phosphor-icons/react/dist/ssr'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useIsMounted } from '@/hook'
import { transitionViewIfSupported } from '@/lib/dom'

const Theme = {
  Light: 'light',
  Dard: 'dark',
}

function useThemeTransition() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = useCallback(() => {
    transitionViewIfSupported(() => {
      flushSync(() =>
        setTheme(theme === Theme.Light ? Theme.Dard : Theme.Light),
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
      <Icon
        className="animate-fade text-xl animate-duration-300"
        weight="duotone"
      />
    </button>
  )
}

export function ThemeSwitcher() {
  const mounted = useIsMounted()
  return <div className="flex w-5">{mounted && <TinyButton />}</div>
}
