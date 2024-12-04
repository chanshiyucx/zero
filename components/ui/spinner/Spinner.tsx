import type { CSSProperties } from 'react'
import clsx from 'clsx'
import { range } from '@/lib/helper'

type Size = 'small' | 'large'

interface SpinnerProps {
  size?: Size
}

interface LineProps {
  order: number
  size: Size
}

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

const Line = ({ order, size }: LineProps) => {
  const scale = createAnimation(
    'ScaleLoader',
    '0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}',
    'scale',
  )

  const style: CSSProperties = {
    animation: `${scale} 1s ${order * 0.1}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)`,
    animationFillMode: 'both',
  }
  const h = size === 'small' ? 'h-6' : 'h-12'

  return (
    <span
      style={style}
      className={clsx(h, 'inline-block w-1 rounded-lg bg-muted')}
    />
  )
}

export function Spinner({ size = 'small' }: SpinnerProps) {
  const gap = size === 'small' ? 'gap-0.5' : 'gap-2'
  return (
    <span className={clsx(gap, 'flex')}>
      {range(0, 5).map((i) => (
        <Line key={i} order={i} size={size} />
      ))}
    </span>
  )
}
