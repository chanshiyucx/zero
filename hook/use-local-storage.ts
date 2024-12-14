import { useState } from 'react'
import { isClientSide } from '@/lib/utils/env'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expire?: number,
): [T, (value: T) => void] {
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
