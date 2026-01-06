'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Nav } from './nav'

const MAX_STAGGER = 20

interface PageProps {
  children: ReactNode
  title?: string
  staggerStart?: number
  staggerDelay?: number
}

export function PageLayout({
  children,
  title,
  staggerStart = 0,
  staggerDelay = 2000,
}: PageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    let index = 0

    const traverse = (node: Element) => {
      for (const child of Array.from(node.children)) {
        const el = child as HTMLElement

        if (el.hasAttribute('data-slide-auto')) {
          el.style.setProperty('--enter-start', `${index * staggerDelay}ms`)
          continue
        }

        if (el.hasAttribute('data-slide')) {
          el.style.setProperty(
            '--enter-stagger',
            String(Math.min(index++, MAX_STAGGER)),
          )
        }

        traverse(el)
      }
    }

    traverse(container)

    container.style.setProperty('--enter-start', `${staggerStart}ms`)
    container.style.setProperty('--enter-delay', `${staggerDelay}ms`)
    container.dataset.ready = ''
  }, [staggerStart, staggerDelay])

  return (
    <main className="page slide-container" ref={containerRef}>
      <Nav />

      {title && (
        <header>
          <h1 data-slide className="text-3xl font-extrabold">
            {title}
          </h1>
        </header>
      )}

      {children}
    </main>
  )
}
