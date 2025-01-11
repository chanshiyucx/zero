import Image from 'next/image'
import { config } from '@/lib/constants/config'

const GithubSVG =
  'https://cdn.jsdelivr.net/gh/chanshiyucx/chanshiyucx@latest/metrics-calendar.svg'

export function GithubStats() {
  return (
    <a
      href={config.links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="card block h-36 bg-surface"
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
