import type { ReactNode } from 'react'
import clsx from 'clsx'

interface TinyButtonProps {
  className?: string
  children: ReactNode
  onClick: () => void
}

export function TinyButton({ className, children, onClick }: TinyButtonProps) {
  return (
    <button
      className={clsx(className, 'rounded-lg bg-surface p-2')}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
