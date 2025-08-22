'use client'

import {
  ArrowsInLineHorizontalIcon,
  ArrowsOutLineHorizontalIcon,
  CalendarBlankIcon,
  NotebookIcon,
  ScrollIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react/dist/ssr'
import { AnimatePresence, m, type Variants } from 'framer-motion'
import Link from 'next/link'
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactElement,
  type Ref,
} from 'react'
import { English, German } from '@/components/icons'
import { DateTime } from '@/components/ui/datetime'
import { heatmapData, type HeatmapData } from '@/lib/utils/content'
import { formatDate } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

const HEATMAP_COLORS = [
  'bg-overlay',
  'bg-rose/40',
  'bg-rose/60',
  'bg-rose/80',
  'bg-rose',
] as const

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const SQUARE_SIZE = 12

const animationVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  enter: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
} as const

type DayInfo =
  | { type: 'placeholder' }
  | {
      type: 'day'
      day: number
      date: string
      posts: HeatmapData[]
      color: string
    }

interface MonthlyData {
  days: DayInfo[]
  width: number
}
type YearlyData = Record<string, MonthlyData>
type CalendarData = Record<string, YearlyData>

interface HoveredDayInfo {
  posts: HeatmapData[]
  date: string
  triggerElement: HTMLDivElement
}

const iconMap: Record<HeatmapData['type'], ReactElement> = {
  post: <ScrollIcon className="shrink-0" />,
  note: <NotebookIcon className="shrink-0" />,
  leetcode: <TerminalWindowIcon className="shrink-0" />,
  english: <English className="shrink-0" />,
  german: <German className="shrink-0" />,
}

function useHeatmapTooltip() {
  const [hoveredDay, setHoveredDay] = useState<HoveredDayInfo | null>(null)
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<number | null>(null)

  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }

  useLayoutEffect(() => {
    if (hoveredDay && tooltipRef.current && containerRef.current) {
      const { triggerElement } = hoveredDay
      const containerRect = containerRef.current.getBoundingClientRect()
      const squareRect = triggerElement.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()

      const SCREEN_RIGHT_MARGIN = 24
      const viewportWidth = document.documentElement.clientWidth

      const top = squareRect.bottom - containerRect.top
      let left = squareRect.left - containerRect.left

      const potentialRightEdgeX = left + tooltipRect.width
      const safeAreaRightX = viewportWidth - SCREEN_RIGHT_MARGIN

      if (potentialRightEdgeX > safeAreaRightX) {
        left = safeAreaRightX - tooltipRect.width - containerRect.left
      }

      setTooltipStyle({
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        opacity: 1,
      })
    }
  }, [hoveredDay])

  const handleDayMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>, dayInfo: DayInfo) => {
      clearHideTimeout()
      if (dayInfo.type !== 'day' || dayInfo.posts.length === 0) {
        setHoveredDay(null)
        return
      }
      setHoveredDay({
        posts: dayInfo.posts,
        date: dayInfo.date,
        triggerElement: e.currentTarget,
      })
    },
    [],
  )

  const handleDayMouseLeave = useCallback(() => {
    hideTimeoutRef.current = window.setTimeout(() => {
      setHoveredDay(null)
    }, 200)
  }, [])

  return {
    hoveredDay,
    tooltipStyle,
    containerRef,
    tooltipRef,
    handleDayMouseEnter,
    handleDayMouseLeave,
    handleTooltipInteraction: {
      onMouseEnter: clearHideTimeout,
      onMouseLeave: handleDayMouseLeave,
    },
  }
}

interface HeatmapTooltipProps {
  hoveredDay: HoveredDayInfo | null
  style: CSSProperties
  tooltipRef: Ref<HTMLDivElement>
  interactionHandlers: {
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
}

function HeatmapTooltip({
  hoveredDay,
  style,
  tooltipRef,
  interactionHandlers,
}: HeatmapTooltipProps) {
  return (
    <AnimatePresence>
      {hoveredDay && (
        <m.div
          ref={tooltipRef}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={animationVariants}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute z-10"
          style={style}
          {...interactionHandlers}
        >
          <div className="bg-surface w-max max-w-xs overflow-hidden rounded-sm px-4 py-3 text-sm shadow-lg">
            <p className="mb-2 inline-flex w-full shrink-0 items-center gap-1">
              <CalendarBlankIcon weight="bold" className="mr-1" />
              <DateTime
                dateString={hoveredDay.date}
                dateFormat="LLL dd, yyyy"
              />
            </p>
            <ul className="flex flex-col gap-1">
              {hoveredDay.posts.map((post, i) => (
                <li key={i} className="inline-flex items-center gap-2">
                  {iconMap[post.type]}
                  <Link
                    className="link-hover text-text truncate"
                    href={post.url}
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

interface HeatmapDayProps {
  dayInfo: DayInfo
  onMouseEnter: (e: MouseEvent<HTMLDivElement>, dayInfo: DayInfo) => void
  onMouseLeave: () => void
}

const HeatmapDay = memo(function HeatmapDay({
  dayInfo,
  onMouseEnter,
  onMouseLeave,
}: HeatmapDayProps) {
  return (
    <div
      className={cn(
        'border-base bg-overlay flex h-3 w-3 flex-shrink-0 cursor-pointer items-center justify-center border-r border-b text-transparent select-none',
        dayInfo.type === 'placeholder' && 'invisible',
        dayInfo.type === 'day' && dayInfo.color,
      )}
      onMouseEnter={(e) => onMouseEnter(e, dayInfo)}
      onMouseLeave={onMouseLeave}
    />
  )
})

interface HeatmapMonthProps {
  month: string
  monthData: MonthlyData
  isSeamless: boolean
  onDayMouseEnter: (e: MouseEvent<HTMLDivElement>, dayInfo: DayInfo) => void
  onDayMouseLeave: () => void
}

const HeatmapMonth = memo(function HeatmapMonth({
  month,
  monthData,
  isSeamless,
  onDayMouseEnter,
  onDayMouseLeave,
}: HeatmapMonthProps) {
  return (
    <div
      className={cn(
        'inline-flex flex-col transition-all duration-300',
        {
          '-mr-3': isSeamless,
          'mr-3': !isSeamless,
        },
        'last:mr-0',
      )}
    >
      <div className="mb-3 max-h-9 text-center text-xs uppercase opacity-60">
        {MONTH_NAMES[Number(month) - 1]}
      </div>
      <div
        className="relative inline-flex h-[84px] flex-col flex-wrap"
        style={{ width: `${monthData.width}px` }}
      >
        {monthData.days.map((dayInfo, index) => (
          <HeatmapDay
            key={index}
            dayInfo={dayInfo}
            onMouseEnter={onDayMouseEnter}
            onMouseLeave={onDayMouseLeave}
          />
        ))}
      </div>
    </div>
  )
})

interface HeatmapControlsProps {
  isSeamless: boolean
  onToggleMode: () => void
}

function HeatmapControls({ isSeamless, onToggleMode }: HeatmapControlsProps) {
  return (
    <div>
      <div
        onClick={onToggleMode}
        className="text-muted mb-3 flex cursor-pointer items-center justify-center"
      >
        {isSeamless ? (
          <ArrowsOutLineHorizontalIcon weight="bold" />
        ) : (
          <ArrowsInLineHorizontalIcon weight="bold" />
        )}
      </div>
      <div className="text-2xs flex h-[84px] w-8 shrink-0 flex-col items-center justify-evenly opacity-60">
        {WEEKDAY_LABELS.map(
          (day, i) => i % 2 !== 0 && <span key={i}>{day}</span>,
        )}
      </div>
    </div>
  )
}

interface HeatmapGridProps {
  calendarData: CalendarData
  isSeamless: boolean
  onDayMouseEnter: (e: MouseEvent<HTMLDivElement>, dayInfo: DayInfo) => void
  onDayMouseLeave: () => void
}

function HeatmapGrid({
  calendarData,
  isSeamless,
  onDayMouseEnter,
  onDayMouseLeave,
}: HeatmapGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const flattenedMonths = useMemo(() => {
    return Object.entries(calendarData).flatMap(([year, months]) =>
      Object.entries(months).map(([month, monthData]) => ({
        key: `${year}-${month}`,
        month,
        monthData,
      })),
    )
  }, [calendarData])

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current
      scrollContainer.scrollLeft = scrollContainer.scrollWidth
    }
  }, [])

  return (
    <div
      className="scrollbar-hide flex flex-row overflow-x-auto"
      ref={scrollContainerRef}
    >
      <figure className="relative inline-flex flex-row">
        {flattenedMonths.map(({ key, month, monthData }) => (
          <HeatmapMonth
            key={key}
            month={month}
            monthData={monthData}
            isSeamless={isSeamless}
            onDayMouseEnter={onDayMouseEnter}
            onDayMouseLeave={onDayMouseLeave}
          />
        ))}
      </figure>
    </div>
  )
}

export function Heatmap() {
  const [isSeamless, setIsSeamless] = useState(false)
  const {
    hoveredDay,
    tooltipStyle,
    containerRef,
    tooltipRef,
    handleDayMouseEnter,
    handleDayMouseLeave,
    handleTooltipInteraction,
  } = useHeatmapTooltip()

  const calendarData = useMemo(() => {
    const { data, startDate, endDate } = heatmapData
    const tempCalendar: Record<string, Record<string, DayInfo[]>> = {}

    const startObj = new Date(startDate)
    const endObj = new Date(endDate)

    const startDateString = formatDate(startObj)
    const endDateString = formatDate(endObj)

    const loopStartDate = new Date(
      startObj.getFullYear(),
      startObj.getMonth(),
      1,
    )
    const loopEndDate = new Date(endObj.getFullYear(), endObj.getMonth() + 1, 0)

    for (
      let d = new Date(loopStartDate);
      d <= loopEndDate;
      d.setDate(d.getDate() + 1)
    ) {
      const year = d.getFullYear().toString()
      const month = (d.getMonth() + 1).toString()
      const day = d.getDate()
      const currentDateString = formatDate(d)

      if (!tempCalendar[year]) tempCalendar[year] = {}
      if (!tempCalendar[year][month]) {
        tempCalendar[year][month] = []
        if (day === 1) {
          const firstDayOfWeek = d.getDay()
          for (let i = 0; i < firstDayOfWeek; i++) {
            tempCalendar[year][month].push({ type: 'placeholder' })
          }
        }
      }

      let posts: HeatmapData[] = []
      let colorIndex = 0

      if (
        currentDateString >= startDateString &&
        currentDateString <= endDateString
      ) {
        posts = data.get(currentDateString) ?? []
        colorIndex = Math.min(posts.length, HEATMAP_COLORS.length - 1)
      }

      tempCalendar[year][month].push({
        type: 'day',
        day: day,
        date: currentDateString,
        posts: posts,
        color: HEATMAP_COLORS[colorIndex],
      })
    }

    const finalCalendar: CalendarData = {}
    for (const year in tempCalendar) {
      finalCalendar[year] = {}
      for (const month in tempCalendar[year]) {
        const days = tempCalendar[year][month]
        finalCalendar[year][month] = {
          days: days,
          width: Math.ceil(days.length / 7) * SQUARE_SIZE,
        }
      }
    }

    return finalCalendar
  }, [])

  const handleToggleMode = () => setIsSeamless((v) => !v)

  return (
    <div className="relative mt-5 w-full" ref={containerRef}>
      <div className="flex w-full flex-row">
        <HeatmapControls
          isSeamless={isSeamless}
          onToggleMode={handleToggleMode}
        />
        <HeatmapGrid
          calendarData={calendarData}
          isSeamless={isSeamless}
          onDayMouseEnter={handleDayMouseEnter}
          onDayMouseLeave={handleDayMouseLeave}
        />
      </div>

      <HeatmapTooltip
        hoveredDay={hoveredDay}
        style={tooltipStyle}
        tooltipRef={tooltipRef}
        interactionHandlers={handleTooltipInteraction}
      />
    </div>
  )
}
