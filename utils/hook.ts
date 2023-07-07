import { useState } from 'react'

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
 * 本地缓存
 */
export const useLocalStorage = <T>(key: string, initialValue: T, expire?: number): [T, (value: T) => void] => {
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
