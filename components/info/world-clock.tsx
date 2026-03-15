'use client'

import { useEffect, useState } from 'react'

type ClockValue = {
  hour: string
  minute: string
}

const MUNICH_TIME_ZONE = 'Europe/Berlin'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: MUNICH_TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function getClockValue(): ClockValue {
  const parts = formatter.formatToParts(new Date())
  let hour = '00'
  let minute = '00'

  for (const part of parts) {
    if (part.type === 'hour') hour = part.value
    if (part.type === 'minute') minute = part.value
  }

  return { hour, minute }
}

export function WorldClock() {
  const [time, setTime] = useState<ClockValue>(() => getClockValue())

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined

    const tick = () => {
      setTime((prev) => {
        const next = getClockValue()
        if (prev.hour === next.hour && prev.minute === next.minute) return prev
        return next
      })

      const delay = 60_000 - (Date.now() % 60_000)
      timerId = setTimeout(tick, delay)
    }
    tick()

    return () => clearTimeout(timerId)
  }, [])

  return (
    <time dateTime={`${time.hour}:${time.minute}`} suppressHydrationWarning>
      <span>{time.hour}</span>
      <span className="animate-clock-blink inline-block w-[1ch] text-center">
        :
      </span>
      <span>{time.minute}</span>
    </time>
  )
}
