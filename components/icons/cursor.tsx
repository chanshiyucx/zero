import type { SVGProps } from 'react'

interface CursorProps extends SVGProps<SVGSVGElement> {
  variant?: 'dark' | 'light'
}

export function Cursor({ variant = 'light', ...props }: CursorProps) {
  const isDark = variant === 'dark'
  const prefix = `lobe-icons-cursor-${variant}`

  const colors = {
    primary: isDark ? '#000' : '#fff',
    secondary: isDark ? '#555' : '#ccc',
    gradientStops: isDark
      ? {
          fill0: [
            { offset: 0.16, color: '#000', opacity: 0.39 },
            { offset: 0.658, color: '#000', opacity: 0.8 },
          ],
          fill1: [
            { offset: 0.182, color: '#000', opacity: 0.31 },
            { offset: 0.715, color: '#000', opacity: 0 },
          ],
          fill2: [
            { offset: 0, color: '#000', opacity: 0.6 },
            { offset: 0.667, color: '#000', opacity: 0.22 },
          ],
        }
      : {
          fill0: [
            { offset: 0.16, color: '#fff', opacity: 0.6 },
            { offset: 0.658, color: '#fff', opacity: 0.9 },
          ],
          fill1: [
            { offset: 0.182, color: '#fff', opacity: 0.5 },
            { offset: 0.715, color: '#fff', opacity: 0.1 },
          ],
          fill2: [
            { offset: 0, color: '#fff', opacity: 0.8 },
            { offset: 0.667, color: '#fff', opacity: 0.4 },
          ],
        },
  }

  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <title>{`Cursor ${variant === 'dark' ? 'Dark' : 'Light'}`}</title>
      <path
        d="M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z"
        fill={`url(#${prefix}-fill-0)`}
      />
      <path
        d="M22.35 18V6L11.925 0v12l10.425 6z"
        fill={`url(#${prefix}-fill-1)`}
      />
      <path
        d="M11.925 0L1.5 6v12l10.425-6V0z"
        fill={`url(#${prefix}-fill-2)`}
      />
      <path d="M22.35 6L11.925 24V12L22.35 6z" fill={colors.secondary} />
      <path d="M22.35 6l-10.425 6L1.5 6h20.85z" fill={colors.primary} />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${prefix}-fill-0`}
          x1={11.925}
          x2={11.925}
          y1={12}
          y2={24}
        >
          {colors.gradientStops.fill0.map((stop, index) => (
            <stop
              key={index}
              offset={stop.offset}
              stopColor={stop.color}
              stopOpacity={stop.opacity}
            />
          ))}
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${prefix}-fill-1`}
          x1={22.35}
          x2={11.925}
          y1={6.037}
          y2={12.15}
        >
          {colors.gradientStops.fill1.map((stop, index) => (
            <stop
              key={index}
              offset={stop.offset}
              stopColor={stop.color}
              stopOpacity={stop.opacity}
            />
          ))}
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={`${prefix}-fill-2`}
          x1={11.925}
          x2={1.5}
          y1={0}
          y2={18}
        >
          {colors.gradientStops.fill2.map((stop, index) => (
            <stop
              key={index}
              offset={stop.offset}
              stopColor={stop.color}
              stopOpacity={stop.opacity}
            />
          ))}
        </linearGradient>
      </defs>
    </svg>
  )
}
