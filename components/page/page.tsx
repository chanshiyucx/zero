import type { ReactNode } from 'react'
import { cn } from '@/lib/utils/style'
import { Nav } from './nav'

interface PageProps {
  children: ReactNode
  title?: string
  className?: string
}

export function PageLayout({ children, title, className }: PageProps) {
  return (
    <main className={cn('page slide-container', className)}>
      <Nav />

      {title && (
        <header>
          <h1
            style={{ '--enter-stagger': 0 }}
            className="text-3xl font-extrabold"
          >
            {title}
          </h1>
        </header>
      )}

      {children}
    </main>
  )
}
