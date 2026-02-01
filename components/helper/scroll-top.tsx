'use client'

import { CaretDoubleUpIcon } from '@phosphor-icons/react/dist/ssr'
import { throttle } from 'es-toolkit'
import { useEffect, useMemo, useState } from 'react'
import { TinyButton } from './tiny-button'

export function ScrollTop() {
  const [showBackTop, setShowBackTop] = useState(false)

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Memoize throttled handler to avoid recreating on every render
  const throttledHandler = useMemo(
    () =>
      throttle(() => {
        const { innerHeight, scrollY } = window
        setShowBackTop(scrollY > innerHeight / 5)
      }, 16),
    [],
  )

  useEffect(() => {
    throttledHandler()

    window.addEventListener('scroll', throttledHandler)
    window.addEventListener('resize', throttledHandler)

    return () => {
      throttledHandler.cancel()
      window.removeEventListener('scroll', throttledHandler)
      window.removeEventListener('resize', throttledHandler)
    }
  }, [throttledHandler])

  return (
    <TinyButton show={showBackTop} onClick={backToTop} label="Scroll to top">
      <CaretDoubleUpIcon className="text-xl" weight="duotone" />
    </TinyButton>
  )
}
