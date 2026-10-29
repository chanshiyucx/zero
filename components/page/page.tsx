import type { ReactNode } from 'react'
import { Nav } from './nav'
import { PageMain } from './page-main'

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
    <PageMain className="page slide-container">
      {showNav && <Nav sharedTitle={sharedTitle} />}

      {title && (
        <header>
          <h1 className="text-3xl font-extrabold italic">{title}</h1>
        </header>
      )}

      {children}
    </PageMain>
  )
}
