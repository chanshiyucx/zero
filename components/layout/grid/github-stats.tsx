import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/constants/config'

const GithubSVG =
  'https://cdn.jsdelivr.net/gh/chanshiyucx/chanshiyucx@latest/metrics-calendar.svg'

export function GithubStats() {
  return (
    <Card>
      <a
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-surface block h-36 overflow-hidden rounded-lg"
      >
        <Image
          src={GithubSVG}
          alt="Github Stats"
          width={362}
          height={144}
          priority
          fetchPriority="high"
          className="object-cover"
        />
      </a>
    </Card>
  )
}
