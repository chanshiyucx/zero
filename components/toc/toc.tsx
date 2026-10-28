'use client'

import { ListIcon } from '@phosphor-icons/react/dist/ssr'
import { clamp, debounce } from 'es-toolkit'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { TocEntry } from '@/lib/mdx/rehype-toc'
import { cn } from '@/lib/utils/style'

type TocProps = {
  toc: TocEntry[]
}

type TocItem = {
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
  const navRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const lastPathStart = useRef<number>(0)
  const lastPathEnd = useRef<number>(0)
  const lastProgress = useRef<number>(0)
  const lastActiveItem = useRef<HTMLLIElement | null>(null)
  const tocItemsRef = useRef<TocItem[]>([])
  const isSyncScheduled = useRef<boolean>(false)

  useEffect(() => {
    const getProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const ratio =
        scrollableHeight > 0
          ? clamp(window.scrollY / scrollableHeight, 0, 1)
          : 0
      return Math.round(ratio * 100)
    }

    const updateTocItems = () => {
      const tocElement = tocRef.current
      if (!tocElement) return

      const listItems = [...tocElement.querySelectorAll('li')]

      tocItemsRef.current = listItems
        .map((item) => {
          const anchor = item.querySelector('a')
          if (!anchor) return null
          const target = document.getElementById(
            anchor.getAttribute('href')?.slice(1) ?? '',
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
        isSyncScheduled.current = false

        const path = pathRef.current
        const nav = navRef.current
        const progressText = progressRef.current
        if (!path || !nav || !progressText) return

        const progress = getProgress()
        const windowHeight = window.innerHeight
        let pathStart = Number.MAX_VALUE
        let pathEnd = 0
        let visibleItems = 0
        let activeItem: TocItem | undefined

        tocItemsRef.current.forEach((item, index) => {
          const targetBounds = item.target.getBoundingClientRect()

          let nextTarget = null
          if (index < tocItemsRef.current.length - 1) {
            nextTarget = tocItemsRef.current[index + 1]?.target ?? null
          }

          const contentBottom = nextTarget
            ? nextTarget.getBoundingClientRect().top
            : document.documentElement.scrollHeight

          const margin = 50
          if (
            contentBottom > margin &&
            targetBounds.top < windowHeight - margin
          ) {
            pathStart = Math.min(item.pathStart ?? 0, pathStart)
            pathEnd = Math.max(item.pathEnd ?? 0, pathEnd)
            visibleItems += 1
            item.listItem.classList.add('visible')

            if (targetBounds.top <= margin) {
              activeItem = item
            }
          } else {
            item.listItem.classList.remove('visible')
          }
        })

        // Re-center only when the section changes: re-issuing a smooth scroll
        // every frame restarts it, and would fight a reader scrolling the TOC
        const activeListItem = activeItem?.listItem ?? null
        if (activeItem && activeListItem !== lastActiveItem.current) {
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
        lastActiveItem.current = activeListItem

        // Written straight to the DOM after all layout reads, and only on
        // change, so scrolling neither re-renders the TOC nor forces layout
        if (progress !== lastProgress.current) {
          progressText.textContent = `${progress}%`
          lastProgress.current = progress
        }
      })
    }

    updateTocItems()
    drawPath()

    const debouncedDrawPath = debounce(drawPath, 100)

    // sync() already batches to one update per frame
    window.addEventListener('resize', debouncedDrawPath)
    window.addEventListener('scroll', sync, { passive: true })

    return () => {
      debouncedDrawPath.cancel()
      window.removeEventListener('resize', debouncedDrawPath)
      window.removeEventListener('scroll', sync)
    }
  }, [toc])

  return (
    <aside
      data-slide
      data-slide-start="2"
      className="group hidden w-0 xl:block"
    >
      <nav
        ref={navRef}
        className="scrollbar-hide sticky top-25 max-h-[80vh] w-72 translate-x-6 overflow-auto overscroll-contain motion-safe:scroll-smooth"
      >
        <div className="text-subtle flex items-center gap-3 px-2">
          <ListIcon weight="bold" />
          <span ref={progressRef} className="text-sm">
            0%
          </span>
        </div>
        <ul ref={tocRef} className="toc p-2 pr-4 text-sm">
          {toc.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={cn(
                  'text-muted decoration-muted/40 hover:text-text hover:decoration-muted flex h-7 items-center underline underline-offset-2 duration-200',
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
            className="transition-all duration-200 ease-out"
          />
        </svg>
      </nav>
    </aside>
  )
}
