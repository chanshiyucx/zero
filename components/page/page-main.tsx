'use client'

import { usePathname } from 'next/navigation'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useRouteViewTransition } from '@/app/provider/route-view-transition-provider'
import { finishEntrance } from '@/lib/utils/dom'

type PageMainProps = {
  className?: string
  children: ReactNode
}

/**
 * Entering a page plays its entrance, while going back to one shows it as it
 * was left. Whether the page was seen before plays no part, so the same action
 * always moves the same way.
 */
export function PageMain({ className, children }: PageMainProps) {
  const mainRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const { isReturning } = useRouteViewTransition()

  // Runs on mount and whenever the router shows a kept page again, before
  // paint and before the route transition captures the new page
  useLayoutEffect(() => {
    const main = mainRef.current
    if (!main) return

    if (isReturning()) finishEntrance(main)
  }, [isReturning, pathname])

  return (
    <main ref={mainRef} className={className}>
      {children}
    </main>
  )
}
