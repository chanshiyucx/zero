'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { isInViewport, transitionViewIfSupported } from '@/lib/utils/dom'

type RouteViewTransitionContextValue = {
  navigate: (href: string, sharedTitle?: string) => void
}

const RouteViewTransitionContext =
  createContext<RouteViewTransitionContextValue | null>(null)

type PendingNavigation = {
  href: string
  transition?: ViewTransition
}

const SHARED_TITLE_NAME = 'article-title'
const TRANSITION_TIMEOUT = 1000

/**
 * Names the visible title whose slug matches the running route transition,
 * so exactly one element per snapshot joins the shared title morph.
 */
const syncSharedTitle = () => {
  const slug = document.documentElement.dataset.routeTransition
  const titles = document.querySelectorAll<HTMLElement>(
    '[data-title-transition]',
  )

  titles.forEach((title) => {
    const isShared =
      !!slug && title.dataset.titleTransition === slug && isInViewport(title)
    title.style.viewTransitionName = isShared ? SHARED_TITLE_NAME : ''
  })
}

export function useRouteViewTransition() {
  const context = useContext(RouteViewTransitionContext)

  if (!context) {
    throw new Error(
      'useRouteViewTransition must be used inside RouteViewTransitionProvider',
    )
  }

  return context
}

export default function RouteViewTransitionProvider({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const resolveTransitionRef = useRef<(() => void) | null>(null)
  const fallbackTimeoutRef = useRef<number | null>(null)
  const pendingNavigationRef = useRef<PendingNavigation | null>(null)

  const finishTransition = useCallback(() => {
    if (resolveTransitionRef.current) {
      syncSharedTitle()
      resolveTransitionRef.current()
      resolveTransitionRef.current = null
      pendingNavigationRef.current = null
    }

    if (fallbackTimeoutRef.current !== null) {
      window.clearTimeout(fallbackTimeoutRef.current)
      fallbackTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    finishTransition()
  }, [finishTransition, pathname])

  const navigate = (href: string, sharedTitle = '') => {
    // Retarget a navigation that has not finished instead of starting another,
    // which would orphan the pending resolver and timeout
    const pending = pendingNavigationRef.current
    if (pending) {
      pending.href = href
      // The old snapshot may already hold the previous title, which the new
      // page cannot match, so drop the morph rather than fade the wrong title
      pending.transition?.skipTransition()
      // Before the update callback runs, it picks up the new href itself
      if (resolveTransitionRef.current) {
        startTransition(() => {
          router.push(href)
        })
      }
      return
    }

    const navigation: PendingNavigation = { href }
    pendingNavigationRef.current = navigation
    navigation.transition = transitionViewIfSupported(
      () =>
        new Promise<void>((resolve) => {
          resolveTransitionRef.current = resolve
          fallbackTimeoutRef.current = window.setTimeout(
            finishTransition,
            TRANSITION_TIMEOUT,
          )

          startTransition(() => {
            router.push(navigation.href)
          })
        }),
      {
        onFinish: () => {
          delete document.documentElement.dataset.routeTransition
          syncSharedTitle()
        },
        onStart: () => {
          document.documentElement.dataset.routeTransition = sharedTitle
          syncSharedTitle()
        },
      },
    )
  }

  return (
    <RouteViewTransitionContext.Provider value={{ navigate }}>
      {children}
    </RouteViewTransitionContext.Provider>
  )
}
