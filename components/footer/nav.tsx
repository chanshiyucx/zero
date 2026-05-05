import type { Icon } from '@phosphor-icons/react'
import {
  GithubLogoIcon,
  RssSimpleIcon,
  ScrollIcon,
  XLogoIcon,
} from '@phosphor-icons/react/dist/ssr'
import { siteConfig } from '@/lib/constants/config'
import { ThemeSwitcher } from './theme-switcher'

type SocialLink = {
  href: string
  icon: Icon
  label: string
  internal?: boolean
}

const socialLinks: SocialLink[] = [
  // { href: '/blogroll', icon: ScrollIcon, label: 'Blogroll', internal: true },
  { href: '/feed', icon: RssSimpleIcon, label: 'RSS Feed' },
  {
    href: siteConfig.links.cv,
    icon: ScrollIcon,
    label: 'CV',
  },
  {
    href: siteConfig.links.twitter,
    icon: XLogoIcon,
    label: 'X',
  },
  {
    href: siteConfig.links.github,
    icon: GithubLogoIcon,
    label: 'GitHub',
  },
]

export function Nav() {
  return (
    <div className="flex gap-3">
      <ThemeSwitcher />

      {socialLinks.map(({ href, icon: Icon, label, internal = false }) => {
        const externalProps = internal
          ? {}
          : ({ target: '_blank', rel: 'noopener noreferrer' } as const)

        return (
          <a key={label} href={href} aria-label={label} {...externalProps}>
            <Icon
              weight="fill"
              className="hover:text-subtle text-muted transition-colors duration-300"
              size={18}
            />
          </a>
        )
      })}
    </div>
  )
}
