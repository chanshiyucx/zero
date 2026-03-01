import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils/style'

type TinyButtonProps = ComponentPropsWithoutRef<'button'> & {
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
        'bg-surface cursor-pointer rounded-md p-2 transition-opacity duration-300',
        show ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      {children}
    </button>
  )
}
