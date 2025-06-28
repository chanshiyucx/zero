import { Moon, Sun } from '@/components/icons'
import { Theme, useIsMounted, useThemeTransition } from '@/hook'

function ThemeButton() {
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
  return <div className="flex w-5">{mounted && <ThemeButton />}</div>
}
