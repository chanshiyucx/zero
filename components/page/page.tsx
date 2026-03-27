import type { ReactNode } from 'react'
import { Nav } from './nav'

type PageProps = {
  children: ReactNode
  title?: string
  showNav?: boolean
}

export function PageLayout({ children, title, showNav = true }: PageProps) {
  return (
    <main className="page slide-container">
      {showNav && <Nav />}

      {title && (
        <header data-slide data-slide-start="0">
          <h1 className="text-3xl font-extrabold italic">{title}</h1>
        </header>
      )}

      {children}
    </main>
  )
}
