import { useEffect, useRef, useState } from 'react'
import { range } from '@/lib/utils/helper'

interface TitleProps {
  title: string
}

function MarqueeTitle({ title }: TitleProps) {
  return (
    <>
      {range(0, 2).map((i) => (
        <span
          key={i}
          className="animate-marquee-left flex shrink-0 flex-row justify-around gap-4 duration-10000 [--gap:1rem]"
        >
          {title}
        </span>
      ))}
    </>
  )
}

export function Title({ title }: TitleProps) {
  const [shouldScroll, setShouldScroll] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current
      const text = textRef.current
      if (!container || !text) return

      const containerStyle = window.getComputedStyle(container)
      const paddingLeft = parseFloat(containerStyle.paddingLeft)
      const paddingRight = parseFloat(containerStyle.paddingRight)
      const availableWidth = container.clientWidth - paddingLeft - paddingRight

      setShouldScroll(text.scrollWidth > availableWidth)
    }

    const timer = setTimeout(checkOverflow, 100)

    const resizeObserver = new ResizeObserver(checkOverflow)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
    }
  }, [title])

  return (
    <div
      ref={containerRef}
      className="flex min-w-0 flex-1 gap-4 overflow-hidden max-md:hidden"
    >
      {shouldScroll ? (
        <MarqueeTitle title={title} />
      ) : (
        <span ref={textRef} className="px-2 whitespace-nowrap">
          {title}
        </span>
      )}
    </div>
  )
}
