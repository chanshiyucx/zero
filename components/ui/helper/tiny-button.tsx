import clsx from 'clsx'
import type { ReactNode } from 'react'

interface TinyButtonProps {
  show: boolean
  children: ReactNode
  onClick: () => void
}

export function TinyButton({ show, children, onClick }: TinyButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'bg-surface rounded-lg p-2 transition-opacity duration-300',
        show ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      {children}
    </button>
  )
}
