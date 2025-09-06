import {
  CompassIcon,
  DiscordLogoIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  RssSimpleIcon,
  XLogoIcon,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { siteConfig } from '@/lib/constants/config'

const socialLinks = [
  { href: '/feed', icon: RssSimpleIcon, label: 'RSS Feed' },
  { href: '/sitemap', icon: CompassIcon, label: 'Sitemap' },
  {
    href: siteConfig.links.twitter,
    icon: XLogoIcon,
    label: 'X (formerly Twitter)',
  },
  { href: siteConfig.links.discord, icon: DiscordLogoIcon, label: 'Discord' },
  { href: siteConfig.links.github, icon: GithubLogoIcon, label: 'GitHub' },
  {
    href: siteConfig.links.linkedIn,
    icon: LinkedinLogoIcon,
    label: 'LinkedIn',
  },
] as const

export function Footer() {
  return (
    <footer className="mb-8 flex items-center justify-between gap-5 text-sm max-md:flex-col-reverse">
      <div className="flex gap-1">
        <Image
          src="/icon.svg"
          alt="Site Logo"
          width={12}
          height={12}
          className="animate-spin duration-3000"
        />
        <p>
          Shiyu
          <span className="ml-1 inline-block translate-y-0.5">&copy; </span>
          2016-{new Date().getFullYear()}
        </p>
      </div>
      <div className="text-muted flex gap-5 text-lg">
        {socialLinks.map(({ href, icon: Icon, label }, index) => {
          return (
            <a
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              href={href}
              aria-label={label}
            >
              <Icon
                weight="fill"
                className="hover:text-subtle transition-colors duration-300"
              />
            </a>
          )
        })}
      </div>
    </footer>
  )
}
