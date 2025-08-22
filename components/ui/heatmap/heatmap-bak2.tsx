'use client'

import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
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
  hidden: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
} as const

const SQUARE_SIZE = 12
const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

interface Post {
  title: string
  url: string
}

type DayInfo =
  | { type: 'placeholder' }
  | { type: 'day'; day: number; date: string; posts: Post[]; color: string }

type MonthlyData = Record<string, DayInfo[]>
type CalendarData = Record<string, MonthlyData>

interface HeatmapProps {
  isSeamless?: boolean
}

export function Heatmap({ isSeamless = false }: HeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    x: number
    y: number
    posts: Post[]
    date: string
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current
      scrollContainer.scrollLeft = scrollContainer.scrollWidth
    }
  }, [])

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

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="flex w-full flex-row items-end">
        <div className="text-2xs flex h-[84px] w-6 shrink-0 flex-col justify-between text-right leading-none opacity-60">
          {WEEKDAY_LABELS.map((day, i) => (
            <span
              key={i}
              className="flex inline-block h-3 w-3 items-center justify-center"
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
                        <div className="mb-3 max-h-9 text-xs uppercase opacity-60">
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
                              onMouseEnter={(e) => {
                                if (
                                  dayInfo.type === 'day' &&
                                  dayInfo.posts.length > 0 &&
                                  containerRef.current
                                ) {
                                  const rect =
                                    e.currentTarget.getBoundingClientRect()
                                  const containerRect =
                                    containerRef.current.getBoundingClientRect()
                                  setHoveredDay({
                                    x:
                                      rect.left -
                                      containerRect.left +
                                      rect.width,
                                    y:
                                      rect.top -
                                      containerRect.top +
                                      rect.height,
                                    posts: dayInfo.posts,
                                    date: dayInfo.date,
                                  })
                                }
                              }}
                              onMouseLeave={() => {
                                setHoveredDay(null)
                              }}
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
            className="bg-surface absolute overflow-hidden rounded-lg px-4 py-3 shadow-lg"
            style={{
              top: hoveredDay.y,
              left: hoveredDay.x,
              width: 'fit-content',
            }}
          >
            <p className="mb-2 text-xs">{hoveredDay.date}</p>
            <ul className="flex flex-col gap-1">
              {hoveredDay.posts.map((post, i) => (
                <li key={i} className="text-sm">
                  <a
                    href={post.url}
                    className="pointer-events-auto hover:underline"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
