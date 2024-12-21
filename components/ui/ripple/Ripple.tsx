import type { CSSProperties } from 'react'

const MAIN_CIRCLE_SIZE = 100
const MAIN_CIRCLE_OPACITY = 0.24
const NUM_CIRCLES = 6

const getStyle = (i: number): CSSProperties => ({
  width: MAIN_CIRCLE_SIZE + i * 70,
  height: MAIN_CIRCLE_SIZE + i * 70,
  opacity: MAIN_CIRCLE_OPACITY - i * 0.03,
  animationDelay: `${i * 0.06}s`,
})

export function Ripple() {
  return (
    <div className="absolute left-1/2 top-1/2 z-0 h-full w-full overflow-visible">
      {Array.from({ length: NUM_CIRCLES }, (_, i) => (
        <div
          key={i}
          className="absolute z-0 animate-ripple rounded-full bg-love/80"
          style={getStyle(i)}
        ></div>
      ))}
    </div>
  )
}
