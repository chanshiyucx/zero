import type { Theme } from '@/type'
import { useEffect, useState } from 'react'
import useLocalStorage from '@/hook/use-local-storage'
import { isClientSide } from '@/lib/env'

export default function useTheme() {
  const [cacheTheme, setCacheTheme] = useLocalStorage<Theme | null>(
    'theme',
    null,
  )

  const schemeTheme =
    isClientSide && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

  const [theme, setTheme] = useState<Theme>(cacheTheme ?? schemeTheme)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    setCacheTheme(theme)
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return [theme, setTheme, toggleTheme] as const
}
