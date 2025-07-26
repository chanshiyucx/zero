'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { useIsMobile } from '@/hook'
import { clamp } from '@/lib/utils/helper'

interface CardProps {
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
  const isMobile = useIsMobile()
  const cardRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const rafRef = useRef<number | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 300, damping: 30 })
  const z = useSpring(0, { stiffness: 300, damping: 30 })

  const transform = useMotionTemplate`
    perspective(1000px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    scale3d(${scale}, ${scale}, ${scale})
    translateZ(${z}px)
  `

  const handleMouseMoveThrottled = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isMobile) return
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!rectRef.current) return

        const rect = rectRef.current
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) / (rect.width / 2)
        const deltaY = (e.clientY - centerY) / (rect.height / 2)
        mouseX.set(deltaX)
        mouseY.set(deltaY)

        const rotX = clamp(deltaY * tiltStrength, -maxTilt, maxTilt)
        const rotY = clamp(-deltaX * tiltStrength, -maxTilt, maxTilt)
        rotateX.set(rotX)
        rotateY.set(rotY)

        scale.set(scaleOnHover)
        z.set(15)
      })
    },
    [
      tiltStrength,
      scaleOnHover,
      maxTilt,
      isMobile,
      mouseX,
      mouseY,
      rotateX,
      rotateY,
      scale,
      z,
    ],
  )

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect()
    }
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
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
  }, [isMobile, mouseX, mouseY, rotateX, rotateY, scale, z])

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  if (isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={cardRef}
      className={`will-change-transform transform-3d ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMoveThrottled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
