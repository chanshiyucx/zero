import { useRef } from 'react'

export function useLoading(duration: number = 1000) {
  if (duration < 0) {
    console.warn('useLoading: duration should not be negative')
    duration = 0
  }

  const startTimeRef = useRef(0)

  const delay = async (): Promise<void> => {
    const interval = duration - (Date.now() - startTimeRef.current)
    if (interval > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, interval))
    }
  }

  const reset = () => {
    startTimeRef.current = Date.now()
  }

  return [delay, reset]
}
