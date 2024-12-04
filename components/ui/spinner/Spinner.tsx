import type { CSSProperties } from 'react'
import { range } from '@/lib/helper'

export const createAnimation = (
  loaderName: string,
  frames: string,
  suffix: string,
): string => {
  const animationName = `react-spinners-${loaderName}-${suffix}`
  const styleEl = document.createElement('style')
  document.head.appendChild(styleEl)
  const styleSheet = styleEl.sheet

  const keyFrames = `
    @keyframes ${animationName} {
      ${frames}
    }
  `

  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0)
  }

  return animationName
}

const scale = createAnimation(
  'ScaleLoader',
  '0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}',
  'scale',
)

interface LineProps {
  order: number
}

const Line = ({ order }: LineProps) => {
  const style: CSSProperties = {
    animation: `${scale} 1s ${order * 0.1}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)`,
    animationFillMode: 'both',
  }

  return (
    <span style={style} className="inline-block h-6 w-1 rounded-lg bg-muted" />
  )
}

export function Spinner() {
  return (
    <span className="flex gap-0.5">
      {range(0, 5).map((i) => (
        <Line key={i} order={i} />
      ))}
    </span>
  )
}
