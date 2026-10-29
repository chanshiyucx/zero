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

type NavigateOptions = {
  /** Slug of the title on this page that morphs into the destination */
  sharedTitle?: string
  /** Goes back to where the reader came from rather than opening a page */
  isReturn?: boolean
}

type RouteViewTransitionContextValue = {
  navigate: (href: string, options?: NavigateOptions) => void
  /** Whether the latest navigation went back, by link or browser history */
  isReturning: () => boolean
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
 * Names the on-screen title whose slug matches the running route transition,
 * so exactly one element per snapshot joins the shared title morph
 */
const syncSharedTitle = () => {
  const slug = document.documentElement.dataset.routeTransition
  const titles = document.querySelectorAll<HTMLElement>(
    '[data-title-transition]',
  )

  titles.forEach((title) => {
    // Pages kept alive by the router stay in the DOM, hidden
    const isShared =
      !!slug &&
      title.dataset.titleTransition === slug &&
      title.checkVisibility() &&
      isInViewport(title)
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
  const isReturningRef = useRef(false)

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

  const isReturning = useCallback(() => isReturningRef.current, [])

  useEffect(() => {
    const onPopState = () => {
      isReturningRef.current = true
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (
    href: string,
    { sharedTitle = '', isReturn = false }: NavigateOptions = {},
  ) => {
    isReturningRef.current = isReturn

    // Retarget an unfinished navigation: starting another would orphan its
    // resolver and timeout
    const pending = pendingNavigationRef.current
    if (pending) {
      pending.href = href
      // The old snapshot may show the previous title, so drop the morph
      pending.transition?.skipTransition()
      // Until it runs, the update callback reads the new href itself
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
    <RouteViewTransitionContext.Provider value={{ navigate, isReturning }}>
      {children}
    </RouteViewTransitionContext.Provider>
  )
}
