import type { CSSProperties } from 'react'
import clsx from 'clsx'

const NUM_CIRCLES = 6
const MAIN_CIRCLE_SIZE = 100
const MAIN_CIRCLE_OPACITY = 0.24
const CIRCLE_GAP = 70

interface RippleProps {
  numCircles?: number
  mainCircleSize?: number
  mainCircleOpacity?: number
  circleGap?: number
  className?: string
}

export function Ripple({
  numCircles = NUM_CIRCLES,
  mainCircleSize = MAIN_CIRCLE_SIZE,
  mainCircleOpacity = MAIN_CIRCLE_OPACITY,
  circleGap = CIRCLE_GAP,
  className,
}: RippleProps) {
  const getStyle = (i: number): CSSProperties => ({
    width: mainCircleSize + i * circleGap,
    height: mainCircleSize + i * circleGap,
    opacity: mainCircleOpacity - i * 0.03,
    animationDelay: `${i * 0.06}s`,
  })

  return (
    <div className="absolute top-1/2 left-1/2 z-0 h-full w-full overflow-visible">
      {Array.from({ length: numCircles }, (_, i) => (
        <div
          key={i}
          className={clsx(
            'animate-ripple bg-love/80 absolute z-0 rounded-full',
            className,
          )}
          style={getStyle(i)}
        ></div>
      ))}
    </div>
  )
}
