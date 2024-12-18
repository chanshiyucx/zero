import Image from 'next/image'
import { config } from '@/lib/constants/config'

const GithubSVG =
  'https://raw.githubusercontent.com/chanshiyucx/chanshiyucx/ee2a4f228b87201a01de7e82e3096ee196908dcf/metrics-calendar.svg'

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
        width={480}
        height={219}
        className="object-cover"
      />
    </a>
  )
}
