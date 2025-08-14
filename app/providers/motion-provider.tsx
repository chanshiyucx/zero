'use client'

import { domAnimation, LazyMotion } from 'framer-motion'
import { type ReactNode } from 'react'
import { useDeviceListener } from '@/hooks/use-device-listener'

export default function MotionProvider({ children }: { children: ReactNode }) {
  useDeviceListener()

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
