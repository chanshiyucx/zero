'use client'

import { m, useSpring, useTransform } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { clamp } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'

type CardProps = {
  active?: boolean
  children: ReactNode
  tiltStrength?: number
  scaleOnHover?: number
  maxTilt?: number
  className?: string
}

const HOVER_MEDIA_QUERY = '(hover: hover) and (pointer: fine)'
const SPRING_CONFIG = { stiffness: 300, damping: 30 }

export function Card({
  children,
  tiltStrength = 12,
  scaleOnHover = 1.01,
  maxTilt = 20,
  className,
}: CardProps) {
  const [canHover, setCanHover] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)

  const rotateX = useSpring(0, SPRING_CONFIG)
  const rotateY = useSpring(0, SPRING_CONFIG)
  const scale = useSpring(1, SPRING_CONFIG)
  const z = useSpring(0, SPRING_CONFIG)

  const transform = useTransform([rotateX, rotateY, scale, z], (values) => {
    const [rx, ry, s, tz] = values as number[]
    return `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${s}, ${s}, ${s}) translateZ(${tz}px)`
  })

  const resetMotion = useCallback(() => {
    const frame = rafRef.current
    if (frame) cancelAnimationFrame(frame)

    rafRef.current = null
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    z.set(0)
    rectRef.current = null
  }, [rotateX, rotateY, scale, z])

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canHover) return
    const frame = rafRef.current
    if (frame) cancelAnimationFrame(frame)

    // Extract values before RAF to avoid stale synthetic event
    const clientX = event.clientX
    const clientY = event.clientY

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      if (!rectRef.current) return

      const rect = rectRef.current
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (clientX - centerX) / (rect.width / 2)
      const deltaY = (clientY - centerY) / (rect.height / 2)

      const rotX = clamp(deltaY * tiltStrength, -maxTilt, maxTilt)
      const rotY = clamp(-deltaX * tiltStrength, -maxTilt, maxTilt)
      rotateX.set(rotX)
      rotateY.set(rotY)

      scale.set(scaleOnHover)
      z.set(15)
    })
  }

  const handleMouseEnter = () => {
    if (!canHover) return
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect()
    }
  }

  const handleMouseLeave = () => {
    if (!canHover) return
    resetMotion()
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia(HOVER_MEDIA_QUERY)
    const updateCanHover = () => setCanHover(mediaQuery.matches)

    updateCanHover()
    mediaQuery.addEventListener('change', updateCanHover)

    return () => {
      mediaQuery.removeEventListener('change', updateCanHover)
      resetMotion()
    }
  }, [resetMotion])

  useEffect(() => {
    if (!canHover) resetMotion()
  }, [canHover, resetMotion])

  return (
    <m.div
      ref={cardRef}
      className={cn('will-change-transform transform-3d', className)}
      style={{ transform: canHover ? transform : undefined }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </m.div>
  )
}
