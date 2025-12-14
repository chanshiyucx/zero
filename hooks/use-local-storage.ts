import { useState } from 'react'
import { isClientSide } from '@/lib/utils/env'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expire?: number,
): readonly [T, (value: T | ((prev: T) => T)) => void] {
  const expireKey = `${key}-expire`

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (!isClientSide) {
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
  })

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      setStoredValue(newValue)
      window.localStorage.setItem(key, JSON.stringify(newValue))
      if (expire) {
        const expireDate = String(Date.now() + expire)
        window.localStorage.setItem(expireKey, expireDate)
      }
    } catch (error) {
      console.error('useLocalStorage Error:', error)
    }
  }

  return [storedValue, setValue]
}
