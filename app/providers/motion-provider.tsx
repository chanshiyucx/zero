import { domAnimation, LazyMotion } from 'framer-motion'
import { type ReactNode } from 'react'

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
