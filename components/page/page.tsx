import type { ReactNode } from 'react'
import { Nav } from './nav'
import { Stagger } from './stagger'

type PageProps = {
  children: ReactNode
  title?: string
  showNav?: boolean
}

export function PageLayout({ children, title, showNav = true }: PageProps) {
  return (
    <main className="page slide-container">
      <Stagger />
      {showNav && <Nav />}

      {title && (
        <header>
          <h1 data-slide className="text-3xl font-extrabold italic">
            {title}
          </h1>
        </header>
      )}

      {children}
    </main>
  )
}
