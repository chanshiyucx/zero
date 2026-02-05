'use client'

import { useLayoutEffect, useRef } from 'react'

const MAX_STAGGER = 20
const STAGGER_DELAY = 50

export function Stagger() {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const container = ref.current?.parentElement
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

  return <span ref={ref} className="hidden" aria-hidden="true" />
}
