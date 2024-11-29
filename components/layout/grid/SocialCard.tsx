import type { ReactNode } from 'react'
import { LinkedinLogo, XLogo } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'

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
      className={clsx(
        className,
        'flex h-[4.125rem] w-full transform-gpu flex-col items-center justify-center rounded-lg text-base duration-500 hover:scale-95',
      )}
    >
      {children}
    </a>
  )
}

export function SocialCard() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <SocialLink href="https://linkedin.com/in/xinchen-cx" className="bg-pine">
        <LinkedinLogo size="1em" className="text-2xl" />
        <p className="-rotate-3 text-xs">(serious stuff)</p>
      </SocialLink>
      <SocialLink href="https://x.com/chanshiyucx" className="bg-text">
        <XLogo size="1em" className="text-2xl" />
        <p className="text-xs">(share memes ;)</p>
      </SocialLink>
    </div>
  )
}
