'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import { Cat } from '@/components/icons'
import { throttle } from '@/lib/utils/lodash'

export function Meow() {
  const catRef = useRef<SVGSVGElement>(null)

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const pupils = catRef.current?.getElementsByClassName('pupil') || []
    const x = `${(event.clientX * 6) / window.innerWidth}%`
    const y = `${(event.clientY * 8) / window.innerHeight}%`

    for (let i = 0; i < pupils.length; i++) {
      const pupil = pupils[i] as HTMLElement
      pupil.style.left = x
      pupil.style.top = y
      pupil.style.transform = `translate(${x}, ${y})`
    }
  }, [])

  useEffect(() => {
    const throttledHandler = throttle(handleMouseMove, 16)

    document.addEventListener('mousemove', throttledHandler)
    return () => document.removeEventListener('mousemove', throttledHandler)
  }, [handleMouseMove])

  return (
    <Link href="/vibes" className="group relative cursor-pointer">
      <Cat ref={catRef} />
      <div className="meow-bubble group-hover:opacity-100">
        <span>meow</span>
        <div className="tail"></div>
      </div>
    </Link>
  )
}
