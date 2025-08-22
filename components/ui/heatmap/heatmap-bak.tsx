'use client'

import { useMemo } from 'react'

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
]

const HEATMAP_COLORS = [
  'bg-overlay',
  'bg-rose/20',
  'bg-rose/40',
  'bg-rose/60',
  'bg-rose/80',
  'bg-rose',
]
const SQUARE_SIZE = 12
const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

type DayInfo =
  | { type: 'placeholder' }
  | { type: 'day'; day: number; color: string }

type MonthlyData = Record<string, DayInfo[]>
type CalendarData = Record<string, MonthlyData>

interface HeatmapProps {
  isSeamless?: boolean
}

export function Heatmap({ isSeamless = true }: HeatmapProps) {
  const calendarData: CalendarData = useMemo(() => {
    const data: CalendarData = {}
    const firstDate = new Date(2017, 0, 1)
    const endDate = new Date(2025, 9, 13)

    for (
      let d = new Date(firstDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const year = d.getFullYear().toString()
      const month = (d.getMonth() + 1).toString()
      const day = d.getDate()
      const dayOfWeek = d.getDay()

      if (!data[year]) {
        data[year] = {}
      }
      if (!data[year][month]) {
        data[year][month] = []
      }

      if (day === 1) {
        for (let i = 0; i < dayOfWeek; i++) {
          data[year][month].push({ type: 'placeholder' })
        }
      }

      data[year][month].push({
        type: 'day',
        day: day,
        color:
          HEATMAP_COLORS[Math.floor(Math.random() * HEATMAP_COLORS.length)],
      })
    }
    return data
  }, [])

  const getWeekCount = (year: string, month: string): number => {
    const firstOfMonth = new Date(Number(year), Number(month) - 1, 1)
    const lastOfMonth = new Date(Number(year), Number(month), 0)
    const usedDays = firstOfMonth.getDay() + lastOfMonth.getDate()
    return Math.ceil(usedDays / 7)
  }

  return (
    <div className="flex w-full flex-row items-end">
      <div className="flex h-[84px] w-6 shrink-0 flex-col justify-between text-right text-[10px] leading-none opacity-60">
        {WEEKDAY_LABELS.map((day, i) => (
          <span key={i} className="inline-block h-3 w-3">
            {day}
          </span>
        ))}
      </div>
      <div className="scrollbar-hide flex flex-row overflow-x-auto">
        <figure className="relative inline-flex flex-row">
          {Object.entries(calendarData).map(([year, months]) => (
            <div key={year} className="inline-flex flex-col">
              <div className="inline-flex flex-row">
                {Object.entries(months).map(([month, days]) => {
                  const monthWidth = getWeekCount(year, month) * SQUARE_SIZE
                  return (
                    <div
                      key={`${year}-${month}`}
                      className={`inline-flex flex-col transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
                        isSeamless ? 'm-[0_-12px_0_0]' : 'm-[0_12px_0_0]'
                      }`}
                    >
                      <div className="mb-3 max-h-9 text-[11px] uppercase opacity-60 transition-all duration-400 ease-in-out">
                        {MONTH_NAMES[Number(month) - 1]}
                      </div>
                      <div
                        className="relative inline-flex h-[84px] flex-col flex-wrap"
                        style={{ width: `${monthWidth}px` }}
                      >
                        {days.map((dayInfo, index) => (
                          <div
                            key={index}
                            className={`flex h-3 w-3 flex-shrink-0 items-center justify-center border-r border-b border-transparent text-[6px] text-transparent transition-all duration-200 select-none ${
                              dayInfo.type === 'placeholder' ? 'invisible' : ''
                            } ${isSeamless ? 'border-transparent' : ''} ${
                              dayInfo.type === 'day'
                                ? dayInfo.color
                                : 'bg-gray-300'
                            }`}
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
  )
}
