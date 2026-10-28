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
 * A title that lands inside an entrance sequence is returning to a list the
 * reader has seen, so the page settles at once and only the title moves.
 * Article titles sit outside the sequence and keep their content's reveal.
 */
const settleEntrance = (title: HTMLElement) => {
  if (!title.closest('[data-slide], [data-slide-auto] > *')) return

  const animations =
    title.closest('.slide-container')?.getAnimations({ subtree: true }) ?? []
  animations.forEach((animation) => {
    if (
      animation instanceof CSSAnimation &&
      animation.animationName === 'slide-enter'
    ) {
      animation.finish()
    }
  })
}

/**
 * Names the on-screen title whose slug matches the running route transition,
 * so exactly one element per snapshot joins the shared title morph. The page
 * settles whenever that title is rendered, even off screen without a morph.
 */
const syncSharedTitle = () => {
  const slug = document.documentElement.dataset.routeTransition
  const titles = document.querySelectorAll<HTMLElement>(
    '[data-title-transition]',
  )

  titles.forEach((title) => {
    // Pages kept alive by the router stay in the DOM, hidden
    const isMatch =
      !!slug &&
      title.dataset.titleTransition === slug &&
      title.checkVisibility()
    const isShared = isMatch && isInViewport(title)
    title.style.viewTransitionName = isShared ? SHARED_TITLE_NAME : ''
    if (isMatch) settleEntrance(title)
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
    <RouteViewTransitionContext.Provider value={{ navigate }}>
      {children}
    </RouteViewTransitionContext.Provider>
  )
}
