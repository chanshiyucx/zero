import {
  // CompassIcon,
  GithubLogoIcon,
  RssSimpleIcon,
  ScrollIcon,
  XLogoIcon,
} from '@phosphor-icons/react/dist/ssr'
import { siteConfig } from '@/lib/constants/config'
import { ThemeSwitcher } from './theme-switcher'

const socialLinks = [
  { href: '/blogroll', icon: ScrollIcon, label: 'Blogroll' },
  { href: '/feed', icon: RssSimpleIcon, label: 'RSS Feed' },
  // { href: '/sitemap', icon: CompassIcon, label: 'Sitemap',  },
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
] as const

export function Nav() {
  return (
    <div className="flex gap-3">
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
