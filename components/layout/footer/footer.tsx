import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/constants/config'

export function Footer() {
  return (
    <footer className="my-3 flex items-center justify-between gap-3 text-sm">
      <div className="flex gap-1">
        <Image
          src="/icon.svg"
          alt="Site Logo"
          width={12}
          height={12}
          priority
        />
        <p>
          Shiyu
          <span className="ml-1 inline-block translate-y-0.5">&copy; </span>
          2016-{new Date().getFullYear()}
        </p>
      </div>
      <div className="flex gap-3 max-md:hidden">
        <Link href="/sitemap" className="link">
          Sitemap
        </Link>
        <Link href="/feed" className="link">
          RSS
        </Link>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Github
        </a>
      </div>
    </footer>
  )
}
