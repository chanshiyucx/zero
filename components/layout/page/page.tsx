import { type ReactNode } from 'react'
import {
  StaggeredFadeInContainer,
  StaggeredFadeInItem,
} from '@/components/ui/stagger'
import { cn } from '@/lib/utils/style'

interface PageProps {
  children: ReactNode
  title?: string
  className?: string
  staggerChildren?: number
}

export function PageLayout({
  children,
  title,
  className,
  staggerChildren,
}: PageProps) {
  return (
    <StaggeredFadeInContainer
      as="main"
      className={cn('page', className)}
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
