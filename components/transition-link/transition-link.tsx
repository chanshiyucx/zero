'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { useRouteViewTransition } from '@/app/provider/route-view-transition-provider'

// Navigation always pushes through the provider, so Link's own navigation
// options would be ignored
type TransitionLinkProps = Omit<
  ComponentProps<typeof Link>,
  'href' | 'onNavigate' | 'replace' | 'scroll'
> & {
  href: string
  /** Slug of the title on this page that morphs into the destination */
  sharedTitle?: string
  /** Leads back to where the reader came from, which then shows settled */
  isReturn?: boolean
}

/** In-site link that navigates through the shared route transition */
export function TransitionLink({
  href,
  sharedTitle,
  isReturn,
  ...props
}: TransitionLinkProps) {
  const { navigate } = useRouteViewTransition()

  return (
    <Link
      {...props}
      href={href}
      onNavigate={(event) => {
        event.preventDefault()
        navigate(href, { sharedTitle, isReturn })
      }}
    />
  )
}
