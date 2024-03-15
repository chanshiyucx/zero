import { useState } from 'react'

export default function useLoading(duration = 1000) {
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
