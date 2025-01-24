'use client'

import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'

export function Backward() {
  const router = useRouter()
  const back = () => router.back()

  return (
    <div
      onClick={back}
      className="text-muted flex items-center justify-start gap-1"
    >
      <CaretRight weight="bold" className="text-sm" />
      <span className="decoration-muted/40 cursor-pointer font-mono font-bold underline underline-offset-4">
        cd ..
      </span>
    </div>
  )
}
