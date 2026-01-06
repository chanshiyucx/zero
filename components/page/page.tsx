'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Nav } from './nav'

const MAX_STAGGER = 20
const STAGGER_DELAY = 100

interface PageProps {
  children: ReactNode
  title?: string
}

export function PageLayout({ children, title }: PageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    let index = 0

    const processNode = (node: Element) => {
      for (const child of node.children) {
        const el = child as HTMLElement

        if (el.hasAttribute('data-slide-auto')) {
          el.style.setProperty('--enter-start', `${index * STAGGER_DELAY}ms`)
          index += Math.min(el.children.length, MAX_STAGGER)
        } else if (el.hasAttribute('data-slide')) {
          el.style.setProperty(
            '--enter-stagger',
            String(Math.min(index++, MAX_STAGGER)),
          )
          processNode(el)
        } else {
          processNode(el)
        }
      }
    }

    processNode(container)

    container.style.setProperty('--enter-start', '0ms')
    container.style.setProperty('--enter-delay', `${STAGGER_DELAY}ms`)
  }, [])

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
