'use client'

import { List } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { TocEntry } from '@/lib/mdx/rehype-toc'
import { debounce } from '@/lib/utils/lodash'

interface TocProps {
  toc: TocEntry[]
}

interface TocItem {
  listItem: HTMLLIElement
  anchor: HTMLAnchorElement
  target: HTMLElement
  pathStart?: number
  pathEnd?: number
}

const getIndent = (depth: number) => {
  if (depth === 2) return 'ml-0'
  if (depth === 3) return 'ml-4'
  return 'ml-0'
}

export function Toc({ toc }: TocProps) {
  const tocRef = useRef<HTMLUListElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const lastPathStart = useRef<number>(0)
  const lastPathEnd = useRef<number>(0)
  const tocItemsRef = useRef<TocItem[]>([])
  const isSyncScheduled = useRef<boolean>(false)

  useEffect(() => {
    const updateTocItems = () => {
      const tocElement = tocRef.current
      if (!tocElement) return

      const listItems = [...tocElement.querySelectorAll('li')]

      tocItemsRef.current = listItems
        .map((item) => {
          const anchor = item.querySelector('a')
          if (!anchor) return null
          const target = document.getElementById(
            anchor.getAttribute('href')?.slice(1) || '',
          )
          if (!target) return null

          return {
            listItem: item,
            anchor: anchor,
            target,
          }
        })
        .filter((item) => item !== null)
    }

    const drawPath = () => {
      const path = pathRef.current
      if (!path) return

      const pathCommands: string[] = []
      let pathIndent: number

      tocItemsRef.current.forEach((item, i) => {
        const x = item.anchor.offsetLeft - 5
        const y = item.anchor.offsetTop
        const height = item.anchor.offsetHeight

        if (i === 0) {
          pathCommands.push(`M ${x} ${y} L ${x} ${y + height}`)
          item.pathStart = 0
        } else {
          if (pathIndent !== x) {
            pathCommands.push(`L ${pathIndent} ${y}`)
          }
          pathCommands.push(`L ${x} ${y}`)

          path.setAttribute('d', pathCommands.join(' '))
          item.pathStart = path.getTotalLength() || 0

          pathCommands.push(`L ${x} ${y + height}`)
        }

        pathIndent = x
        path.setAttribute('d', pathCommands.join(' '))
        item.pathEnd = path.getTotalLength()
      })

      sync()
    }

    const sync = () => {
      if (isSyncScheduled.current) return
      isSyncScheduled.current = true

      requestAnimationFrame(() => {
        const path = pathRef.current
        if (!path) return

        const windowHeight = window.innerHeight
        let pathStart = Number.MAX_VALUE
        let pathEnd = 0
        let visibleItems = 0

        tocItemsRef.current.forEach((item, index) => {
          const targetBounds = item.target.getBoundingClientRect()

          let nextTarget = null
          if (index < tocItemsRef.current.length - 1) {
            nextTarget = tocItemsRef.current[index + 1].target
          }

          const contentBottom = nextTarget
            ? nextTarget.getBoundingClientRect().top
            : document.documentElement.scrollHeight

          const margin = 50
          if (
            contentBottom > margin &&
            targetBounds.top < windowHeight - margin
          ) {
            pathStart = Math.min(item.pathStart || 0, pathStart)
            pathEnd = Math.max(item.pathEnd || 0, pathEnd)
            visibleItems += 1
            item.listItem.classList.add('visible')
          } else {
            item.listItem.classList.remove('visible')
          }
        })

        if (visibleItems > 0 && pathStart < pathEnd) {
          if (
            pathStart !== lastPathStart.current ||
            pathEnd !== lastPathEnd.current
          ) {
            const pathLength = path.getTotalLength()
            path.setAttribute('stroke-dashoffset', '1')
            path.setAttribute(
              'stroke-dasharray',
              `1, ${pathStart}, ${pathEnd - pathStart}, ${pathLength}`,
            )
            path.setAttribute('opacity', '1')
          }
        } else {
          path.setAttribute('opacity', '0')
        }

        lastPathStart.current = pathStart
        lastPathEnd.current = pathEnd

        isSyncScheduled.current = false
      })
    }

    // Update toc items
    updateTocItems()

    // Initial draw
    drawPath()

    const debouncedDrawPath = debounce(drawPath, 100)

    // Add event listeners
    window.addEventListener('resize', debouncedDrawPath)
    window.addEventListener('scroll', sync)

    return () => {
      window.removeEventListener('resize', debouncedDrawPath)
      window.removeEventListener('scroll', sync)
    }
  }, [toc])

  return (
    <aside className="hidden w-0 xl:block">
      <nav className="sticky top-24 mt-12 w-64 translate-x-4">
        <List
          size="1.5em"
          weight="bold"
          className="ml-2 text-muted opacity-40 transition-opacity duration-500 hover:opacity-100"
        />
        <ul ref={tocRef} className="toc p-2 pr-4 text-sm">
          {toc.map((item) => (
            <li key={item.id} className="my-2">
              <Link
                href={`#${item.id}`}
                className={clsx(
                  'inline-block text-muted underline decoration-muted/40 underline-offset-2 duration-300 hover:text-text hover:decoration-muted',
                  getIndent(item.depth),
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <svg
          className="toc-marker absolute inset-0 -z-10 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            stroke="hsl(var(--color-subtle) / 1)"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray="0, 0, 0, 1000"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-0.5, -0.5)"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </nav>
    </aside>
  )
}
