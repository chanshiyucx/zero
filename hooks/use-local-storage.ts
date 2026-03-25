import { useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expire?: number,
): readonly [T, (value: T | ((prev: T) => T)) => void] {
  const expireKey = `${key}-expire`

  const readValue = (): T => {
    try {
      if (typeof window === 'undefined') {
        return initialValue
      }

      const expireDate = window.localStorage.getItem(expireKey)
      if (expireDate && Date.now() > Number(expireDate)) {
        return initialValue
      }

      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.error('useLocalStorage Error:', error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value
        window.localStorage.setItem(key, JSON.stringify(newValue))
        if (expire) {
          const expireDate = String(Date.now() + expire)
          window.localStorage.setItem(expireKey, expireDate)
        }
        return newValue
      })
    } catch (error) {
      console.error('useLocalStorage Error:', error)
    }
  }

  return [storedValue, setValue]
}
