'use client'

import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react/dist/ssr'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { Theme, useThemeTransition } from '@/hooks/use-theme-transition'
import { cn } from '@/lib/utils/style'

function ThemeButton() {
  const { toggleTheme, resolvedTheme } = useThemeTransition()
  const isLight = resolvedTheme === Theme.Light
  const Icon = isLight ? SunIcon : MoonStarsIcon

  return (
    <button
      onClick={toggleTheme}
      aria-label="Switch theme"
      className={cn('cursor-pointer', isLight && 'animate-spin duration-20000')}
    >
      <Icon
        weight="fill"
        className="hover:text-subtle text-muted transition-colors duration-300"
        size={18}
      />
    </button>
  )
}

export function ThemeSwitcher() {
  const mounted = useIsMounted()
  return <div className="flex w-5">{mounted && <ThemeButton />}</div>
}
