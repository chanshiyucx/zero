import Image from 'next/image'
import { config } from '@/lib/constants/config'

const GithubSVG =
  'https://raw.githubusercontent.com/chanshiyucx/chanshiyucx/0eb826693c5681bc09c2521b78cfcf13dee47da9/metrics-calendar.svg'

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
