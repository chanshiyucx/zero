import type { ReactNode } from 'react'
import { LinkedinLogo, XLogo } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import { config } from '@/lib/constants/config'

interface SocialLinkProps {
  className: string
  href: string
  children: ReactNode
}

function SocialLink({ children, className, href }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        className,
        'card-sm flex h-[4.125rem] w-full flex-col items-center justify-center text-base',
      )}
    >
      {children}
    </a>
  )
}

export function SocialCard() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <SocialLink href={config.links.linkedIn} className="bg-pine">
        <LinkedinLogo size="1em" className="text-2xl" />
        <p className="-rotate-3 text-xs">(serious stuff)</p>
      </SocialLink>
      <SocialLink
        href={config.links.twitter}
        className="bg-iris dark:bg-iris/75"
      >
        <XLogo size="1em" className="text-2xl" />
        <p className="text-xs">(share memes ;)</p>
      </SocialLink>
    </div>
  )
}
