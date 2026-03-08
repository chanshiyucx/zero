'use client'

import { useLayoutEffect, useRef } from 'react'
import { Signature } from '@/components/icons'
import { cn } from '@/lib/utils/style'

type SignatureBoxProps = {
  animate?: boolean
  className?: string
}

const SignatureBox = ({ animate, className }: SignatureBoxProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    const svg = svgRef.current
    if (!svg || !animate) return

    const paths = svg.querySelectorAll<SVGPathElement>('path')
    paths.forEach((path, i) => {
      const length = path.getTotalLength()
      path.style.setProperty('--path-length', `${length}px`)
      path.style.setProperty('--delay', `${i * 0.1}s`)
      path.classList.add('logo-path')
    })

    return () => {
      paths.forEach((path) => {
        path.classList.remove('logo-path')
        path.style.removeProperty('--path-length')
        path.style.removeProperty('--delay')
      })
    }
  }, [animate])

  return (
    <Signature
      ref={svgRef}
      fill={animate ? undefined : 'var(--color-muted)'}
      className={cn('h-auto w-46 drop-shadow-lg max-md:w-36', className)}
    />
  )
}

export function Logo() {
  return (
    <div className="relative">
      <SignatureBox className="absolute top-0 left-0" />
      <SignatureBox animate />
    </div>
  )
}
