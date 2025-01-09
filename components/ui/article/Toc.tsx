'use client'

import { List } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { TocEntry } from '@/lib/mdx/rehype-toc'

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

  useEffect(() => {
    const drawPath = () => {
      const tocElement = tocRef.current
      const path = pathRef.current
      if (!tocElement || !path) return

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
      const path = pathRef.current
      if (!path) return

      const windowHeight = window.innerHeight
      let pathStart = Number.MAX_VALUE
      let pathEnd = 0
      let visibleItems = 0

      tocItemsRef.current.forEach((item, index) => {
        const targetBounds = item.target.getBoundingClientRect()

        // 获取下一个标题的位置（如果存在）
        let nextTarget = null
        if (index < tocItemsRef.current.length - 1) {
          nextTarget = tocItemsRef.current[index + 1].target
        }

        // 计算当前内容块的底部边界
        const contentBottom = nextTarget
          ? nextTarget.getBoundingClientRect().top
          : document.documentElement.scrollHeight

        // 判断当前内容块是否可见（标题到下一个标题之间的内容）
        if (contentBottom > 0 && targetBounds.top < windowHeight) {
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
          // path.setAttribute('opacity', '1')
        }
      } else {
        // path.setAttribute('opacity', '0')
      }

      lastPathStart.current = pathStart
      lastPathEnd.current = pathEnd
    }

    // Initial draw
    drawPath()

    // Add event listeners
    window.addEventListener('resize', drawPath)
    window.addEventListener('scroll', sync)

    // Cleanup
    return () => {
      window.removeEventListener('resize', drawPath)
      window.removeEventListener('scroll', sync)
    }
  }, [toc])

  return (
    <aside className="-ml-64 hidden min-h-screen w-60 xl:block">
      <nav className="sticky top-24 mt-20">
        <List
          size="1.5em"
          weight="bold"
          className="ml-2 mt-3 text-muted opacity-40 transition-opacity duration-500 group-hover:opacity-100 hover:opacity-100"
        />
        <ul
          ref={tocRef}
          className="toc p-2 text-sm opacity-100 transition-opacity duration-500 group-hover:opacity-100 hover:opacity-100"
        >
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
