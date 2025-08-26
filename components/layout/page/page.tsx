import { type ReactNode } from 'react'
import {
  StaggeredFadeInContainer,
  StaggeredFadeInItem,
} from '@/components/ui/stagger'

interface PageProps {
  children: ReactNode
  title?: string
}

export function PageLayout({ children, title }: PageProps) {
  return (
    <StaggeredFadeInContainer as="main" className="page">
      {title && (
        <StaggeredFadeInItem as="header">
          <h1 className="text-4xl font-extrabold max-md:text-3xl">{title}</h1>
        </StaggeredFadeInItem>
      )}
      {children}
    </StaggeredFadeInContainer>
  )
}
