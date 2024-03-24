'use client'

import clsx from 'clsx'
import { ArrowUpToLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { throttle } from '@/lib/lodash'

export default function ScrollTop() {
  const [showBackTop, setShowBackTop] = useState(false)

  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  useEffect(() => {
    const readViewport = throttle(() => {
      const { innerHeight, scrollY } = window
      setShowBackTop(scrollY > innerHeight / 5)
    }, 16)

    readViewport()

    window.addEventListener('resize', readViewport)
    return () => {
      window.removeEventListener('resize', readViewport)
    }
  }, [])

  useEffect(() => {
    const scrollHandler = throttle(
      () => {
        const { innerHeight, scrollY } = window
        setShowBackTop(scrollY > innerHeight / 5)
      },
      16,
      {
        leading: false,
      },
    )

    scrollHandler()

    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <button
      className={clsx(
        !showBackTop && 'hidden',
        'rounded-full border bg-zinc-50 p-3 shadow dark:border-zinc-800 dark:bg-zinc-800',
      )}
      type="button"
      onClick={backToTop}
    >
      <ArrowUpToLine size={20} />
    </button>
  )
}
