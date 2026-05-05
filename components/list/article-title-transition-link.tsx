'use client'

import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { useRouteViewTransition } from '@/app/provider/route-view-transition-provider'
import { getArticleTitleTransitionName } from '@/lib/utils/dom'
import { cn } from '@/lib/utils/style'

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
      className={cn('article-title-transition', className)}
      onNavigate={(event) => {
        event.preventDefault()
        navigate(href)
      }}
      style={
        {
          '--article-title-transition-name':
            getArticleTitleTransitionName(slug),
        } as CSSProperties
      }
    >
      {children}
    </Link>
  )
}
