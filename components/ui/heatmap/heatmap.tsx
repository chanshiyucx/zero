'use client'

import {
  CalendarBlankIcon,
  NotebookIcon,
  ScrollIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react/dist/ssr'
import { AnimatePresence, m } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type ReactElement } from 'react'
import { English, German } from '@/components/icons'
import { DateTime } from '@/components/ui/datetime'
import { heatmapData } from '@/lib/utils/content'
import { formatDate } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'

const MONTH_NAMES = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
] as const

const HEATMAP_COLORS = [
  'bg-overlay',
  'bg-rose/20',
  'bg-rose/40',
  'bg-rose/60',
  'bg-rose/80',
  'bg-rose',
] as const

const variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  enter: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
} as const

const SQUARE_SIZE = 12
const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

interface Post {
  title: string
  url: string
  type: string
}

type DayInfo =
  | { type: 'placeholder' }
  | { type: 'day'; day: number; date: string; posts: Post[]; color: string }

type MonthlyData = Record<string, DayInfo[]>
type CalendarData = Record<string, MonthlyData>

interface HeatmapProps {
  isSeamless?: boolean
}

const icon: Record<string, ReactElement> = {
  post: <ScrollIcon className="shrink-0" />,
  note: <NotebookIcon className="shrink-0" />,
  leetcode: <TerminalWindowIcon className="shrink-0" />,
  english: <English className="shrink-0" />,
  german: <German className="shrink-0" />,
}

export function Heatmap({ isSeamless = false }: HeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    posts: Post[]
    date: string
    style: React.CSSProperties
  } | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current
      scrollContainer.scrollLeft = scrollContainer.scrollWidth
    }
  }, [])

  console.log('heatmapData:', heatmapData)

  const calendarData: CalendarData = useMemo(() => {
    const { data, startDate, endDate } = heatmapData
    const calendar: CalendarData = {}

    const start = new Date(startDate)
    const end = new Date(endDate)
    const loopStartDate = new Date(start.getFullYear(), start.getMonth(), 1)
    const loopEndDate = new Date(end.getFullYear(), end.getMonth() + 1, 0)

    for (let d = loopStartDate; d <= loopEndDate; d.setDate(d.getDate() + 1)) {
      const year = d.getFullYear().toString()
      const month = (d.getMonth() + 1).toString()
      const day = d.getDate()
      const dayOfWeek = d.getDay()

      if (!calendar[year]) {
        calendar[year] = {}
      }
      if (!calendar[year][month]) {
        calendar[year][month] = []
      }

      if (day === 1) {
        for (let i = 0; i < dayOfWeek; i++) {
          calendar[year][month].push({ type: 'placeholder' })
        }
      }

      const dateString = formatDate(d)
      const posts = data.get(dateString) ?? []
      const colorIndex = Math.min(posts.length, HEATMAP_COLORS.length - 1)
      const color = HEATMAP_COLORS[colorIndex]

      calendar[year][month].push({
        type: 'day',
        day: day,
        date: dateString,
        posts: posts,
        color: color,
      })
    }
    return calendar
  }, [])

  const getWeekCount = (year: string, month: string): number => {
    const firstOfMonth = new Date(Number(year), Number(month) - 1, 1)
    const lastOfMonth = new Date(Number(year), Number(month), 0)
    const usedDays = firstOfMonth.getDay() + lastOfMonth.getDate()
    return Math.ceil(usedDays / 7)
  }

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    dayInfo: DayInfo,
  ) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
    if (
      dayInfo.type !== 'day' ||
      dayInfo.posts.length === 0 ||
      !containerRef.current
    ) {
      return
    }

    const squareRect = e.currentTarget.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    const estimatedWidth = 280
    const margin = 24

    const top = squareRect.bottom - containerRect.top
    let left = squareRect.right - containerRect.left

    const tooltipRightEdge = squareRect.right + estimatedWidth
    if (tooltipRightEdge > window.innerWidth - margin) {
      left = window.innerWidth - containerRect.left - estimatedWidth - margin
    }

    setHoveredDay({
      posts: dayInfo.posts,
      date: dayInfo.date,
      style: {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        maxWidth: `${estimatedWidth}px`,
      },
    })
  }

  const handleMouseLeave = () => {
    hideTimeoutRef.current = window.setTimeout(() => {
      setHoveredDay(null)
    }, 200)
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="flex w-full flex-row items-end">
        <div className="text-2xs flex h-[84px] w-6 shrink-0 flex-col justify-between text-right leading-none opacity-60">
          {WEEKDAY_LABELS.map((day, i) => (
            <span
              key={i}
              className="inline-flex h-3 w-3 items-center justify-center"
            >
              {day}
            </span>
          ))}
        </div>
        <div
          className="scrollbar-hide flex flex-row overflow-x-auto"
          ref={scrollContainerRef}
        >
          <figure className="relative inline-flex flex-row">
            {Object.entries(calendarData).map(([year, months]) => (
              <div key={year} className="inline-flex flex-col">
                <div className="inline-flex flex-row">
                  {Object.entries(months).map(([month, days]) => {
                    const monthWidth = getWeekCount(year, month) * SQUARE_SIZE
                    return (
                      <div
                        key={`${year}-${month}`}
                        className={cn(
                          'inline-flex flex-col',
                          isSeamless ? '-mr-3' : 'mr-3',
                        )}
                      >
                        <div className="mb-3 max-h-9 text-center text-xs uppercase opacity-60">
                          {MONTH_NAMES[Number(month) - 1]}
                        </div>
                        <div
                          className="relative inline-flex h-[84px] flex-col flex-wrap"
                          style={{ width: `${monthWidth}px` }}
                        >
                          {days.map((dayInfo, index) => (
                            <div
                              key={index}
                              className={cn(
                                'border-base bg-overlay flex h-3 w-3 flex-shrink-0 cursor-pointer items-center justify-center border-r border-b text-[6px] text-transparent select-none',
                                dayInfo.type === 'placeholder' && 'invisible',
                                dayInfo.type === 'day' && dayInfo.color,
                              )}
                              onMouseEnter={(e) => handleMouseEnter(e, dayInfo)}
                              onMouseLeave={handleMouseLeave}
                            >
                              {dayInfo.type === 'day' ? dayInfo.day : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </figure>
        </div>
      </div>

      <AnimatePresence>
        {hoveredDay && (
          <m.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            className="bg-surface absolute z-10 w-max overflow-hidden rounded-lg px-4 py-3 text-sm shadow-lg"
            style={hoveredDay.style}
            onMouseEnter={() => {
              if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current)
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            <p className="mb-2 inline-flex w-full shrink-0 items-center gap-1">
              <CalendarBlankIcon weight="bold" className="mr-1" />
              <DateTime
                dateString={hoveredDay.date}
                dateFormat="LLL dd, yyyy"
              />
            </p>
            <ul className="flex flex-col gap-1">
              {hoveredDay.posts.map((post, i) => {
                const PostIcon = icon[post.type]
                return (
                  <li key={i} className="inline-flex items-center gap-2">
                    {PostIcon}
                    <Link
                      href={post.url}
                      className="pointer-events-auto truncate hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
