import {
  ArrowsInLineVerticalIcon,
  CaretLineUpIcon,
  CubeIcon,
  FireIcon,
  GitCommitIcon,
  StarFourIcon,
} from '@phosphor-icons/react/dist/ssr'
import { createElement } from 'react'
import { getContribution, type ContributionCalendar } from '@/lib/api/github'

const statistics = (calendar: ContributionCalendar) => {
  let max = 0
  const streak = { max: 0, current: 0 }
  const values = []

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      values.push(day.contributionCount)
      max = Math.max(max, day.contributionCount)
      streak.current = day.contributionCount ? streak.current + 1 : 0
      streak.max = Math.max(streak.max, streak.current)
    }
  }

  const average = values.reduce((a, b) => a + b, 0) / values.length
  return { streak, max, average }
}

const ContributionSvg = ({
  calendar,
  max,
}: {
  calendar: ContributionCalendar
  max: number
}) => {
  const size = 6
  const filterKeys = [1, 2]
  const channels = ['R', 'G', 'B']

  return (
    <svg viewBox="0,0,240,160" className="h-30">
      <defs>
        {filterKeys.map((k) => (
          <filter key={`brightness${k}`} id={`brightness${k}`}>
            <feComponentTransfer>
              {channels.map((channel) => {
                return createElement(`feFunc${channel}`, {
                  key: channel,
                  type: 'linear',
                  slope: 1 - k * 0.4,
                })
              })}
            </feComponentTransfer>
          </filter>
        ))}
      </defs>
      <g transform="scale(4) translate(12, 0)">
        {calendar.weeks.map((week, i) => (
          <g key={i} transform={`translate(${i * 1.7}, ${i})`}>
            {week.contributionDays.map((day, j) => {
              const ratio = day.contributionCount / max || 0
              return (
                <g
                  key={day.date}
                  transform={`translate(${j * -1.7}, ${j + (1 - ratio) * size})`}
                >
                  <path fill={day.color} d="M1.7,2 0,1 1.7,0 3.4,1 z" />
                  <path
                    fill={day.color}
                    filter="url(#brightness1)"
                    d={`M0,1 1.7,2 1.7,${2 + ratio * size} 0,${1 + ratio * size} z`}
                  />
                  <path
                    fill={day.color}
                    filter="url(#brightness2)"
                    d={`M1.7,2 3.4,1 3.4,${1 + ratio * size} 1.7,${2 + ratio * size} z`}
                  />
                </g>
              )
            })}
          </g>
        ))}
      </g>
    </svg>
  )
}

export async function Contribution() {
  const now = new Date()

  // Ensure start day is a sunday, and that time is set to 00:00:00.000
  const start = new Date(now)
  start.setMonth(start.getMonth() - 6)
  start.setUTCHours(0, 0, 0, 0)
  const dayOfWeek = start.getUTCDay()
  if (dayOfWeek !== 0) {
    start.setDate(start.getDate() - dayOfWeek)
  }
  const calendar = await getContribution(start.toISOString(), now.toISOString())
  const { streak, max, average } = statistics(calendar)

  return (
    <div className="flex h-full items-center">
      <ContributionSvg calendar={calendar} max={max} />
      <div className="text-xs">
        <h3 className="text-rose flex items-center gap-1">
          <CubeIcon weight="bold" />
          Commits streaks
        </h3>
        <div className="flex items-center gap-1">
          <FireIcon weight="bold" />
          Current streak {streak.current}
        </div>
        <div className="flex items-center gap-1">
          <StarFourIcon weight="bold" />
          Best streak {streak.max}
        </div>
        <h3 className="text-rose mt-2 flex items-center gap-1">
          <GitCommitIcon weight="bold" />
          Commits per day
        </h3>
        <div className="flex items-center gap-1">
          <CaretLineUpIcon weight="bold" />
          Highest in a day at {max}
        </div>
        <div className="flex items-center gap-1">
          <ArrowsInLineVerticalIcon weight="bold" />
          Average per day at ~{average.toFixed(2)}
        </div>
      </div>
    </div>
  )
}
