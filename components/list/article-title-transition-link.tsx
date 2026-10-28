'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useRouteViewTransition } from '@/app/provider/route-view-transition-provider'

type ArticleTitleTransitionLinkProps = {
  children: ReactNode
  className?: string
  href: string
  slug: string
}

export function ArticleTitleTransitionLink({
  children,
  className,
  href,
  slug,
}: ArticleTitleTransitionLinkProps) {
  const { navigate } = useRouteViewTransition()

  return (
    <Link
      href={href}
      className={className}
      data-title-transition={slug}
      onNavigate={(event) => {
        event.preventDefault()
        navigate(href, slug)
      }}
    >
      {children}
    </Link>
  )
}
