'use client'

import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'

export function Backward() {
  const router = useRouter()
  const back = () => router.back()

  return (
    <div
      onClick={back}
      className="flex items-center justify-start gap-1 text-muted"
    >
      <CaretRight weight="bold" className="text-sm" />
      <span className="cursor-pointer font-mono font-bold underline decoration-muted/40 underline-offset-4">
        cd ..
      </span>
    </div>
  )
}
