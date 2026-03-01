'use client'

import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { clamp } from '@/lib/utils/helper'
import { useDevice } from '@/stores/use-device'

type CardProps = {
  active?: boolean
  children: ReactNode
  tiltStrength?: number
  scaleOnHover?: number
  maxTilt?: number
  className?: string
}

export function Card({
  children,
  tiltStrength = 12,
  scaleOnHover = 1.01,
  maxTilt = 20,
  className = '',
}: CardProps) {
  const isMobile = useDevice((s) => s.isMobile)
  const cardRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 300, damping: 30 })
  const z = useSpring(0, { stiffness: 300, damping: 30 })

  const transform = useTransform([rotateX, rotateY, scale, z], (values) => {
    const [rx, ry, s, tz] = values as number[]
    return `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${s}, ${s}, ${s}) translateZ(${tz}px)`
  })

  const handleMouseMoveThrottled = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    // Extract values before RAF to avoid stale synthetic event
    const clientX = e.clientX
    const clientY = e.clientY

    rafRef.current = requestAnimationFrame(() => {
      if (!rectRef.current) return

      const rect = rectRef.current
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (clientX - centerX) / (rect.width / 2)
      const deltaY = (clientY - centerY) / (rect.height / 2)
      mouseX.set(deltaX)
      mouseY.set(deltaY)

      const rotX = clamp(deltaY * tiltStrength, -maxTilt, maxTilt)
      const rotY = clamp(-deltaX * tiltStrength, -maxTilt, maxTilt)
      rotateX.set(rotX)
      rotateY.set(rotY)

      scale.set(scaleOnHover)
      z.set(15)
    })
  }

  const handleMouseEnter = () => {
    if (isMobile) return
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect()
    }
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    mouseX.set(0)
    mouseY.set(0)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    z.set(0)

    rectRef.current = null
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <m.div
      ref={cardRef}
      className={`will-change-transform transform-3d ${className}`}
      style={{ transform: isMobile ? '' : transform }}
      onMouseMove={handleMouseMoveThrottled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </m.div>
  )
}
