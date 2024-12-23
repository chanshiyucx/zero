'use client'

import { useEffect, useRef } from 'react'
import { Cat } from '@/components/icons'

export function Meow() {
  const catRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pupils = catRef.current?.getElementsByClassName('pupil') || []

    const handleMouseMove = (event: MouseEvent) => {
      const x = `${(event.clientX * 6) / window.innerWidth}%`
      const y = `${(event.clientY * 8) / window.innerHeight}%`

      for (let i = 0; i < pupils.length; i++) {
        const pupil = pupils[i] as HTMLElement
        pupil.style.left = x
        pupil.style.top = y
        pupil.style.transform = `translate(${x}, ${y})`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={catRef}>
      <Cat />
    </div>
  )
}
