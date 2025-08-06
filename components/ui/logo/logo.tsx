'use client'

import { useEffect, useRef } from 'react'
import { Signature } from '@/components/icons'

const SignatureBox = ({ animate }: { animate?: boolean }) => {
  const svgGroupRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svgGroupElement = svgGroupRef.current
    if (!svgGroupElement || !animate) return

    const paths = svgGroupElement.querySelectorAll('path')
    paths.forEach((path: SVGPathElement, i: number) => {
      const length = path.getTotalLength()
      path.style.setProperty('--path-length', `${length}px`)
      path.style.strokeDasharray = `${length}px`
      path.style.strokeDashoffset = `${length}px`
      path.style.stroke = 'var(--color-text)'
      path.style.animation = `10s svg-text ${i * 0.1}s infinite ease-in-out`
    })
  }, [animate])

  return (
    <Signature
      ref={svgGroupRef}
      className="absolute top-0 left-0 h-36 w-60 drop-shadow-lg"
    />
  )
}

export function Logo() {
  return (
    <div className="relative h-36 w-60 max-md:m-auto">
      <SignatureBox />
      <SignatureBox animate={true} />
    </div>
  )
}
