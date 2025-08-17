import { LinkedinLogoIcon, XLogoIcon } from '@phosphor-icons/react/dist/ssr'
import { type ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/constants/config'
import { cn } from '@/lib/utils/style'

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
      className={cn(
        className,
        'flex h-[4.125rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg text-base',
      )}
    >
      {children}
    </a>
  )
}

export function SocialCard() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Card tiltStrength={6}>
        <SocialLink
          href={siteConfig.links.linkedIn}
          className="wave from-pine to-pine/40 bg-gradient-to-t"
        >
          <LinkedinLogoIcon size="1em" className="text-2xl" />
          <p className="-rotate-3 text-xs">(serious stuff)</p>
        </SocialLink>
      </Card>
      <Card tiltStrength={6}>
        <SocialLink
          href={siteConfig.links.twitter}
          className="wave wave-reverse from-iris to-iris/40 bg-gradient-to-t"
        >
          <XLogoIcon size="1em" className="text-2xl" />
          <p className="text-xs">(share memes ;)</p>
        </SocialLink>
      </Card>
    </div>
  )
}
