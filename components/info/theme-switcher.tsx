'use client'

import { Moon, Sun } from '@/components/icons'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { Theme, useThemeTransition } from '@/hooks/use-theme-transition'

function ThemeButton() {
  const { toggleTheme, resolvedTheme } = useThemeTransition()
  const Icon = resolvedTheme === Theme.Light ? Sun : Moon

  return (
    <button
      onClick={toggleTheme}
      aria-label="Switch theme"
      className="cursor-pointer"
    >
      <Icon className="text-lg" />
    </button>
  )
}

export function ThemeSwitcher() {
  const mounted = useIsMounted()
  return <div className="flex w-5">{mounted && <ThemeButton />}</div>
}
