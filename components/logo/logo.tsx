'use client'

import { useEffect, useRef } from 'react'
import { Signature } from '@/components/icons'
import { cn } from '@/lib/utils/style'

type SignatureBoxProps = {
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
      path.style.strokeDasharray = `${length}px`
      path.style.strokeDashoffset = `${length}px`
      path.style.stroke = 'var(--color-text)'
      path.style.setProperty('--path-length', `${length}px`)
      path.style.setProperty('--delay', `${i * 0.1}s`)
      path.classList.add('animate-svg-text')
    })
  }, [animate])

  return (
    <Signature
      ref={svgGroupRef}
      className={cn('h-auto w-46 drop-shadow-lg max-md:w-36', className)}
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
