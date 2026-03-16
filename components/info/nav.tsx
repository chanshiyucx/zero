import {
  // CompassIcon,
  GithubLogoIcon,
  RssSimpleIcon,
  XLogoIcon,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { siteConfig } from '@/lib/constants/config'
import { ThemeSwitcher } from './theme-switcher'

const socialLinks = [
  { href: '/feed', icon: RssSimpleIcon, label: 'RSS Feed' },
  // { href: '/sitemap', icon: CompassIcon, label: 'Sitemap' },
  {
    href: siteConfig.links.twitter,
    icon: XLogoIcon,
    label: 'X (formerly Twitter)',
  },
  { href: siteConfig.links.github, icon: GithubLogoIcon, label: 'GitHub' },
] as const

export function Nav() {
  return (
    <div
      data-slide
      className="not-prose mt-auto mb-12 flex items-center justify-between gap-5 text-sm max-md:flex-col-reverse"
    >
      <div className="flex items-center gap-3">
        <Link href="/blogroll" className="link">
          Blogroll
        </Link>
        <span className="bg-text inline-block h-1 w-1"></span>
        <Link href="/stats" className="link">
          Stats
        </Link>
      </div>

      <div className="text-muted flex gap-3 text-lg">
        <ThemeSwitcher />

        {socialLinks.map(({ href, icon: Icon, label }) => {
          return (
            <a
              key={label}
              target="_blank"
              rel="noopener noreferrer"
              href={href}
              aria-label={label}
            >
              <Icon
                weight="duotone"
                className="hover:text-subtle transition-colors duration-300"
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}
