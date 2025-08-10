import { type ReactNode } from 'react'
import { cn } from '@/lib/utils/style'

interface TinyButtonProps {
  show: boolean
  children: ReactNode
  onClick: () => void
  label: string
}

export function TinyButton({
  show,
  children,
  onClick,
  label,
}: TinyButtonProps) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={cn(
        'bg-surface rounded-lg p-2 transition-opacity duration-300',
        show ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      {children}
    </button>
  )
}
