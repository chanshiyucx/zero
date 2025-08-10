'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useCommandStore } from '@/stores'

const LazyCommand = dynamic(
  () => import('./command-panel').then((mod) => mod.CommandPanel),
  { ssr: false },
)

export function Command() {
  const { open, toggle } = useCommandStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggle])

  return <>{open && <LazyCommand />}</>
}
