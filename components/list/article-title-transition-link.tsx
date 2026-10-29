import type { ReactNode } from 'react'
import { TransitionLink } from '@/components/transition-link'

type ArticleTitleTransitionLinkProps = {
  children: ReactNode
  className?: string
  href: string
  slug: string
}

/** Article title in a list: it is the shared title and starts the morph */
export function ArticleTitleTransitionLink({
  slug,
  ...props
}: ArticleTitleTransitionLinkProps) {
  return (
    <TransitionLink
      {...props}
      sharedTitle={slug}
      data-title-transition={slug}
    />
  )
}
