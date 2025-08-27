import { type ReactNode } from 'react'
import {
  StaggeredFadeInContainer,
  StaggeredFadeInItem,
} from '@/components/ui/stagger'

interface PageProps {
  children: ReactNode
  title?: string
  staggerChildren?: number
}

export function PageLayout({ children, title, staggerChildren }: PageProps) {
  return (
    <StaggeredFadeInContainer
      as="main"
      className="page"
      staggerChildren={staggerChildren}
    >
      {title && (
        <StaggeredFadeInItem as="header">
          <h1 className="text-4xl font-extrabold max-md:text-3xl">{title}</h1>
        </StaggeredFadeInItem>
      )}
      {children}
    </StaggeredFadeInContainer>
  )
}
