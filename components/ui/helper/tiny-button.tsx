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
      onClick={onClick}
      className={clsx(className, 'bg-surface rounded-lg p-2')}
    >
      {children}
    </button>
  )
}
