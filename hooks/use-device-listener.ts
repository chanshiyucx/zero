import { useEffect } from 'react'
import { getIsMobile } from '@/lib/utils/dom'
import { debounce } from '@/lib/utils/lodash'
import { useDeviceStore } from '@/stores'

export function useDeviceListener(breakpoint = 768) {
  const setIsMobile = useDeviceStore((s) => s.setIsMobile)

  useEffect(() => {
    setIsMobile(getIsMobile())

    const debouncedCheck = debounce(() => {
      setIsMobile(window.innerWidth < breakpoint)
    }, 200)

    window.addEventListener('resize', debouncedCheck)
    return () => {
      window.removeEventListener('resize', debouncedCheck)
    }
  }, [breakpoint, setIsMobile])
}
