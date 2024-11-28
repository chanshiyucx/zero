'use client'

import type { ReactNode } from 'react'
import clsx from 'clsx'

interface TinyButtonProps {
  className?: string
  children: ReactNode
  onClick: () => void
}

export default function TinyButton({
  className,
  children,
  onClick,
}: TinyButtonProps) {
  return (
    <button
      className={clsx(
        className,
        'rounded-lg bg-zinc-50 p-2 shadow-sm md:border dark:border-zinc-800 dark:bg-zinc-800',
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
