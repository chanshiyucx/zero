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

const Line = ({ order, size }: LineProps) => {
  const style: CSSProperties = { animationDelay: `${order * 0.1}s` }
  const h = size === 'small' ? 'h-6' : 'h-12'

  return (
    <span
      style={style}
      className={clsx(
        h,
        'inline-block w-1 animate-spinner-scale rounded-lg bg-muted duration-1000',
      )}
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
