'use client'

import { ListIcon } from '@phosphor-icons/react/dist/ssr'
import { useEffect, useRef } from 'react'
import type { TocEntry } from '@/lib/mdx/rehype-toc'
import { clamp } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'

type TocProps = {
  toc: TocEntry[]
  slideStart?: number
}

type TocElements = {
  nav: HTMLElement
  list: HTMLUListElement
  rail: SVGPathElement
  progress: HTMLElement
}

type TocItem = {
  heading: HTMLElement
  listItem: HTMLLIElement
  link: HTMLAnchorElement
}

type Rail = {
  d: string
  length: number
  /** Distances along the rail for each link. */
  runs: { start: number; end: number }[]
}

/** Heading indices; -1 means no match. */
type ReadingState = {
  first: number
  last: number
  active: number
}

// Keep in sync with xl:block.
const XL_MEDIA_QUERY = '(min-width: 80rem)'
const READING_EDGE = 50
const RAIL_GAP = 5

// Axis-aligned segments let us accumulate lengths without measuring the SVG.
const buildRail = (links: HTMLElement[]): Rail => {
  const commands: string[] = []
  const runs: Rail['runs'] = []
  let length = 0
  let pen: { x: number; y: number } | undefined

  const lineTo = (x: number, y: number) => {
    if (!pen) {
      commands.push(`M ${x} ${y}`)
    } else if (x !== pen.x || y !== pen.y) {
      commands.push(`L ${x} ${y}`)
      length += Math.abs(x - pen.x) + Math.abs(y - pen.y)
    }
    pen = { x, y }
  }

  links.forEach((link) => {
    const x = link.offsetLeft - RAIL_GAP
    const top = link.offsetTop

    lineTo(pen?.x ?? x, top)
    lineTo(x, top)
    const start = length
    lineTo(x, top + link.offsetHeight)
    runs.push({ start, end: length })
  })

  return { d: commands.join(' '), length, runs }
}

/** Heading positions and content end use viewport coordinates. */
const getReadingState = (
  tops: number[],
  end: number,
  viewportHeight: number,
): ReadingState => {
  const state: ReadingState = { first: -1, last: -1, active: -1 }

  tops.forEach((top, index) => {
    const bottom = tops[index + 1] ?? end
    if (bottom <= READING_EDGE || top >= viewportHeight - READING_EDGE) return

    if (state.first < 0) state.first = index
    state.last = index
    if (top <= READING_EDGE) state.active = index
  })

  return state
}

const getProgress = () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight
  if (scrollableHeight <= 0) return 0
  return Math.round(clamp(window.scrollY / scrollableHeight, 0, 1) * 100)
}

const getCenterTop = (nav: HTMLElement, item: HTMLElement) => {
  const navRect = nav.getBoundingClientRect()
  const itemRect = item.getBoundingClientRect()
  if (itemRect.top >= navRect.top && itemRect.bottom <= navRect.bottom) {
    return undefined
  }
  return item.offsetTop - nav.clientHeight / 2 + item.clientHeight / 2
}

const trackReading = (
  { nav, list, rail, progress }: TocElements,
  toc: TocEntry[],
) => {
  const listItems = list.querySelectorAll('li')
  const items = toc.flatMap((entry, index): TocItem[] => {
    const heading = document.getElementById(entry.id)
    const listItem = listItems[index]
    const link = listItem?.querySelector('a')
    return heading && listItem && link ? [{ heading, listItem, link }] : []
  })

  let geometry: Rail
  let frame = 0
  let lastRange = ''
  let lastActive = -1
  let lastProgress = -1

  const drawRail = () => {
    geometry = buildRail(items.map((item) => item.link))
    rail.setAttribute('d', geometry.d)
    lastRange = ''
  }

  const sync = () => {
    frame = 0

    // Measure before mutating the DOM.
    const tops = items.map((item) => item.heading.getBoundingClientRect().top)
    const end =
      items.at(-1)?.heading.parentElement?.getBoundingClientRect().bottom ?? 0
    const { first, last, active } = getReadingState(
      tops,
      end,
      window.innerHeight,
    )
    const percent = getProgress()
    const activeItem = items[active]
    const centerTop =
      active !== lastActive && activeItem
        ? getCenterTop(nav, activeItem.listItem)
        : undefined

    items.forEach((item, index) => {
      item.listItem.classList.toggle('visible', index >= first && index <= last)
    })

    const range = `${first} ${last}`
    if (range !== lastRange) {
      const from = geometry.runs[first]
      const to = geometry.runs[last]
      if (from && to) {
        rail.setAttribute(
          'stroke-dasharray',
          `${to.end - from.start} ${geometry.length}`,
        )
        rail.setAttribute('stroke-dashoffset', `${-from.start}`)
      }
      rail.setAttribute('opacity', from && to ? '1' : '0')
      lastRange = range
    }

    // Repeated scrollTo calls would restart the smooth scroll.
    if (active !== lastActive) {
      items[lastActive]?.link.removeAttribute('aria-current')
      activeItem?.link.setAttribute('aria-current', 'location')
      if (centerTop !== undefined) nav.scrollTo({ top: centerTop })
      lastActive = active
    }

    if (percent !== lastProgress) {
      progress.textContent = `${percent}%`
      lastProgress = percent
    }
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(sync)
  }

  drawRail()
  schedule()

  const resizeObserver = new ResizeObserver(() => {
    drawRail()
    schedule()
  })
  resizeObserver.observe(list)
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)

  return () => {
    cancelAnimationFrame(frame)
    resizeObserver.disconnect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    items[lastActive]?.link.removeAttribute('aria-current')
  }
}

export function Toc({ toc, slideStart }: TocProps) {
  const navRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const railRef = useRef<SVGPathElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const nav = navRef.current
    const list = listRef.current
    const rail = railRef.current
    const progress = progressRef.current
    if (!nav || !list || !rail || !progress) return

    const media = window.matchMedia(XL_MEDIA_QUERY)
    let stopTracking: (() => void) | undefined

    const updateTracking = () => {
      stopTracking?.()
      stopTracking = media.matches
        ? trackReading({ nav, list, rail, progress }, toc)
        : undefined
    }

    updateTracking()
    media.addEventListener('change', updateTracking)

    return () => {
      media.removeEventListener('change', updateTracking)
      stopTracking?.()
    }
  }, [toc])

  return (
    <aside
      data-slide
      data-slide-start={slideStart}
      className="hidden w-0 xl:block"
    >
      <nav
        ref={navRef}
        aria-label="Table of contents"
        className="scrollbar-hide sticky top-25 max-h-[80vh] w-72 translate-x-6 overflow-auto overscroll-contain motion-safe:scroll-smooth"
      >
        <div className="text-subtle flex items-center gap-3 px-2">
          <ListIcon weight="bold" aria-hidden />
          <span ref={progressRef} className="text-sm">
            0%
          </span>
        </div>
        <ul ref={listRef} className="toc p-2 pr-4 text-sm">
          {toc.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={cn(
                  'text-muted decoration-muted/40 hover:text-text hover:decoration-muted flex h-7 items-center underline underline-offset-2 duration-200',
                  entry.depth === 3 && 'ml-4',
                )}
              >
                {entry.title}
              </a>
            </li>
          ))}
        </ul>
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <path
            ref={railRef}
            stroke="var(--color-muted)"
            strokeWidth="3"
            fill="none"
            opacity="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            // Lands the 3px stroke on whole pixels
            transform="translate(-0.5, -0.5)"
            className="transition-all duration-200 ease-out"
          />
        </svg>
      </nav>
    </aside>
  )
}
