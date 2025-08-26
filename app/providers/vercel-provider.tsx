import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { type ReactNode } from 'react'

export default function VercelProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
