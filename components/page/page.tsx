import type { ReactNode } from 'react'
import { Nav } from './nav'

type PageProps = {
  children: ReactNode
  title?: string
  showNav?: boolean
  sharedTitle?: string
}

export function PageLayout({
  children,
  title,
  showNav = true,
  sharedTitle,
}: PageProps) {
  return (
    <main className="page slide-container">
      {showNav && <Nav sharedTitle={sharedTitle} />}

      {title && (
        <header>
          <h1 className="text-3xl font-extrabold italic">{title}</h1>
        </header>
      )}

      {children}
    </main>
  )
}
