'use client'

import { CaretDoubleUpIcon } from '@phosphor-icons/react/dist/ssr'
import { useCallback, useEffect, useState } from 'react'
import { throttle } from '@/lib/utils/lodash'
import { TinyButton } from './tiny-button'

export function ScrollTop() {
  const [showBackTop, setShowBackTop] = useState(false)

  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleScrollAndResize = useCallback(() => {
    const { innerHeight, scrollY } = window
    setShowBackTop(scrollY > innerHeight / 5)
  }, [])

  useEffect(() => {
    const throttledHandler = throttle(handleScrollAndResize, 16)
    throttledHandler()

    window.addEventListener('scroll', throttledHandler)
    window.addEventListener('resize', throttledHandler)

    return () => {
      window.removeEventListener('scroll', throttledHandler)
      window.removeEventListener('resize', throttledHandler)
    }
  }, [handleScrollAndResize])

  return (
    <TinyButton show={showBackTop} onClick={backToTop}>
      <CaretDoubleUpIcon className="text-xl" weight="duotone" />
    </TinyButton>
  )
}
