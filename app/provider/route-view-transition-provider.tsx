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
import { transitionViewIfSupported } from '@/lib/utils/dom'

type RouteViewTransitionContextValue = {
  navigate: (href: string) => void
}

const RouteViewTransitionContext =
  createContext<RouteViewTransitionContextValue | null>(null)

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

  const finishTransition = useCallback(() => {
    resolveTransitionRef.current?.()
    resolveTransitionRef.current = null

    if (fallbackTimeoutRef.current !== null) {
      window.clearTimeout(fallbackTimeoutRef.current)
      fallbackTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    finishTransition()
  }, [finishTransition, pathname])

  const navigate = useCallback(
    (href: string) => {
      transitionViewIfSupported(
        () =>
          new Promise<void>((resolve) => {
            resolveTransitionRef.current = resolve
            fallbackTimeoutRef.current = window.setTimeout(
              finishTransition,
              3000,
            )

            startTransition(() => {
              router.push(href)
            })
          }),
        {
          onFinish: () => {
            delete document.documentElement.dataset.routeTransition
          },
          onStart: () => {
            document.documentElement.dataset.routeTransition = 'true'
          },
        },
      )
    },
    [finishTransition, router],
  )

  return (
    <RouteViewTransitionContext.Provider value={{ navigate }}>
      {children}
    </RouteViewTransitionContext.Provider>
  )
}
