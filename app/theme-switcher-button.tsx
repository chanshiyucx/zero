'use client'

import { Moon, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { transitionViewIfSupported } from '@/lib/dom'

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
}

export function useIsMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

function useThemeTransition() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = useCallback(() => {
    transitionViewIfSupported(() => {
      flushSync(() => setTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK))
    })
  }, [theme, setTheme])

  return {
    theme,
    toggleTheme,
  }
}

export function ThemeSwitcherButton() {
  const { toggleTheme, theme } = useThemeTransition()
  const mounted = useIsMounted()

  if (!mounted) return null

  return (
    <button
      className="rounded-xl bg-neutral-200 p-4 dark:bg-neutral-800"
      type="button"
      onClick={toggleTheme}
    >
      {theme === 'light' ? <Moon /> : <SunDim />}
    </button>
  )
}
