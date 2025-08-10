import { useEffect } from 'react'
import { getIsMobile } from '@/lib/utils/dom'
import { debounce } from '@/lib/utils/lodash'
import { useDevice } from '@/stores/use-device'

export function useDeviceListener(breakpoint = 768) {
  const setIsMobile = useDevice((s) => s.setIsMobile)

  useEffect(() => {
    setIsMobile(getIsMobile())

    const check = debounce(() => {
      setIsMobile(window.innerWidth < breakpoint)
    }, 200)

    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint, setIsMobile])
}
