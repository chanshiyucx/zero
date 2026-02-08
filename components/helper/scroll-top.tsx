'use client'

import { CaretDoubleUpIcon } from '@phosphor-icons/react/dist/ssr'
import { throttle } from 'es-toolkit'
import { useEffect, useRef, useState } from 'react'
import { TinyButton } from './tiny-button'

export function ScrollTop() {
  const [showBackTop, setShowBackTop] = useState(false)

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const throttledHandler = useRef(
    throttle(() => {
      const { innerHeight, scrollY } = window
      setShowBackTop(scrollY > innerHeight / 5)
    }, 16),
  )

  useEffect(() => {
    const fn = throttledHandler.current
    fn()

    window.addEventListener('scroll', fn)
    window.addEventListener('resize', fn)

    return () => {
      fn.cancel()
      window.removeEventListener('scroll', fn)
      window.removeEventListener('resize', fn)
    }
  }, [])

  return (
    <TinyButton show={showBackTop} onClick={backToTop} label="Scroll to top">
      <CaretDoubleUpIcon size={18} weight="duotone" />
    </TinyButton>
  )
}
