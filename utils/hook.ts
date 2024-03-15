import type { Theme } from '@/type'
import { useEffect, useState } from 'react'

/**
 * Page Loading
 */
export const useLoading = (duration = 1000) => {
  const [startTime] = useState(new Date().getTime())
  const loading = () =>
    new Promise<void>((resolve) => {
      const interval = duration - (new Date().getTime() - startTime)
      if (interval > 0) {
        setTimeout(resolve, interval)
      } else {
        resolve()
      }
    })
  return loading
}

/**
 * LocalStorage
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  expire?: number,
): [T, (value: T) => void] => {
  const expireKey = `${key}-expire`
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue
      }
      const expireDate = window.localStorage.getItem(expireKey)
      if (expireDate && Date.now() > Number(expireDate)) {
        return initialValue
      }
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
      if (expire) {
        const expireDate = String(Date.now() + expire)
        window.localStorage.setItem(expireKey, expireDate)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Toggle theme
 */
export const useTheme = () => {
  console.log('111')
  const [cacheTheme, setCacheTheme] = useLocalStorage<Theme | null>(
    'theme',
    null,
  )

  const initTheme =
    cacheTheme ?? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  const [theme, setTheme] = useState<Theme>(initTheme)

  const toggleTheme = () => {
    console.log('toggleTheme')
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    console.log(theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setCacheTheme(theme)
  }, [theme])

  return [theme, setTheme, toggleTheme] as const
}
