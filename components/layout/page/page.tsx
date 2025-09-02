import { type ReactNode } from 'react'
import { cn } from '@/lib/utils/style'

interface PageProps {
  children: ReactNode
  title?: string
  className?: string
}

export function PageLayout({ children, title, className }: PageProps) {
  return (
    <main className={cn('page slide-container', className)}>
      {title && (
        <header>
          <h1
            style={{ '--enter-stagger': 0 }}
            className="text-4xl font-extrabold max-md:text-3xl"
          >
            {title}
          </h1>
        </header>
      )}
      {children}
    </main>
  )
}
