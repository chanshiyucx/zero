'use client'

import { useEffect, useRef } from 'react'
import { Signature } from '@/components/icons'
import { cn } from '@/lib/utils/style'

interface SignatureBoxProps {
  animate?: boolean
  className?: string
}

const SignatureBox = ({ animate, className }: SignatureBoxProps) => {
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
      className={cn('h-auto w-50 drop-shadow-lg max-md:w-40', className)}
    />
  )
}

export function Logo() {
  return (
    <div className="relative">
      <SignatureBox className="absolute top-0 left-0" />
      <SignatureBox animate={true} />
    </div>
  )
}
