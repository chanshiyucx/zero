import Image from 'next/image'
import { siteConfig } from '@/lib/constants/config'

const GithubSVG =
  'https://cdn.jsdelivr.net/gh/chanshiyucx/chanshiyucx@latest/metrics-calendar.svg'

export function GithubStats() {
  return (
    <a
      href={siteConfig.links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="card bg-surface block h-36"
    >
      <Image
        src={GithubSVG}
        alt="Github Stats"
        width={362}
        height={144}
        className="object-cover"
      />
    </a>
  )
}
