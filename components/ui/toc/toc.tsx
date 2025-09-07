'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { type TocEntry } from '@/lib/mdx/rehype-toc'
import { debounce } from '@/lib/utils/lodash'
import { cn } from '@/lib/utils/style'

interface TocProps {
  toc: TocEntry[]
  stagger: number
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

export function Toc({ toc, stagger }: TocProps) {
  const tocRef = useRef<HTMLUListElement>(null)
  const navRef = useRef<HTMLElement>(null)
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
        const nav = navRef.current
        if (!path || !nav) return

        const windowHeight = window.innerHeight
        let pathStart = Number.MAX_VALUE
        let pathEnd = 0
        let visibleItems = 0
        let activeItem: TocItem | undefined

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

            if (targetBounds.top <= margin) {
              activeItem = item
            }
          } else {
            item.listItem.classList.remove('visible')
          }
        })

        if (activeItem) {
          const navBounds = nav.getBoundingClientRect()
          const activeItemBounds = activeItem.listItem.getBoundingClientRect()

          if (
            activeItemBounds.top < navBounds.top ||
            activeItemBounds.bottom > navBounds.bottom
          ) {
            nav.scrollTo({
              top:
                activeItem.listItem.offsetTop -
                nav.clientHeight / 2 +
                activeItem.listItem.clientHeight / 2,
              behavior: 'smooth',
            })
          }
        }

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

    updateTocItems()

    drawPath()

    const debouncedDrawPath = debounce(drawPath, 100)

    window.addEventListener('resize', debouncedDrawPath)
    window.addEventListener('scroll', sync)

    return () => {
      window.removeEventListener('resize', debouncedDrawPath)
      window.removeEventListener('scroll', sync)
    }
  }, [toc])

  return (
    <aside
      style={{ '--enter-stagger': stagger }}
      className="group hidden w-0 xl:block"
    >
      <nav
        ref={navRef}
        className="scrollbar-hide sticky top-24 max-h-[60vh] w-64 translate-x-6 -translate-y-1.5 overflow-auto"
      >
        <ul ref={tocRef} className="toc space-y-2 p-2 pr-4 text-sm">
          {toc.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={cn(
                  'text-muted decoration-muted/40 hover:text-text hover:decoration-muted inline-block underline underline-offset-2 duration-300',
                  getIndent(item.depth),
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <path
            ref={pathRef}
            stroke="var(--color-muted)"
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
