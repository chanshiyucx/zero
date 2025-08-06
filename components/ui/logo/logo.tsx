'use client'

import { useEffect, useRef } from 'react'
import { Signature } from '@/components/icons'

export function Logo() {
  const svgGroupRef = useRef(null)

  useEffect(() => {
    const svgGroupElement = svgGroupRef.current
    if (!svgGroupElement) return

    const paths = (svgGroupElement as SVGGElement).querySelectorAll('path')
    paths.forEach((path: SVGPathElement, i: number) => {
      const length = path.getTotalLength()
      path.style.setProperty('--path-length', `${length}px`)
      path.style.strokeDasharray = `${length}px`
      path.style.strokeDashoffset = `${length}px`
      path.style.strokeWidth = '2px'
      path.style.stroke = 'var(--color-text)'
      path.style.animation = '10s svg-text infinite ease-in-out'
      path.style.animationDelay = `${i * 0.1}s`
    })
  }, [])

  return (
    <div className="relative h-36 w-60">
      <Signature className="absolute top-0 left-0 h-36 w-60 drop-shadow-lg max-md:text-center" />
      <Signature
        ref={svgGroupRef}
        className="absolute top-0 left-0 h-36 w-60 drop-shadow-lg max-md:text-center"
      />
    </div>
  )
}
