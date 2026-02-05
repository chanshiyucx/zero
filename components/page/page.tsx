import type { ReactNode } from 'react'
import { Nav } from './nav'
import { Stagger } from './stagger'

interface PageProps {
  children: ReactNode
  title?: string
}

export function PageLayout({ children, title }: PageProps) {
  return (
    <main className="page slide-container">
      <Stagger />
      <Nav />

      {title && (
        <header>
          <h1 data-slide className="text-3xl font-extrabold">
            {title}
          </h1>
        </header>
      )}

      {children}
    </main>
  )
}
