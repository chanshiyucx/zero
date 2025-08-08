import {
  CompassIcon,
  DiscordLogoIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  RssSimpleIcon,
  XLogoIcon,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
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
    <footer className="my-3 flex items-center justify-between gap-5 text-sm max-md:flex-col-reverse max-md:gap-3">
      <div className="flex gap-1">
        <Image
          src="/icon.svg"
          alt="Site Logo"
          width={12}
          height={12}
          priority
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
          const external = href.startsWith('http')
          const linkProps = external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {}

          const LinkComponent = external ? 'a' : Link

          return (
            <LinkComponent
              key={index}
              href={href}
              aria-label={label}
              {...linkProps}
            >
              <Icon
                weight="fill"
                className="hover:text-subtle transition-colors duration-300"
              />
            </LinkComponent>
          )
        })}
      </div>
    </footer>
  )
}
