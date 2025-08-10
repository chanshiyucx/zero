import { type CSSProperties } from 'react'
import { range } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'

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
      className={cn(
        h,
        'animate-spinner-scale bg-muted inline-block w-1 rounded-lg duration-1000',
      )}
    />
  )
}

export function Spinner({ size = 'small' }: SpinnerProps) {
  const gap = size === 'small' ? 'gap-0.5' : 'gap-2'
  return (
    <span className={cn(gap, 'flex')}>
      {range(0, 5).map((i) => (
        <Line key={i} order={i} size={size} />
      ))}
    </span>
  )
}
