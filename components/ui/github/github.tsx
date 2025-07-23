import {
  GitForkIcon,
  GithubLogoIcon,
  GlobeIcon,
  StarIcon,
} from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import { Date } from '@/components/ui/date'
import type { Repository } from '@/lib/api'

interface GithubProps {
  repo: Repository
  className?: string
}

export function Github({ repo, className }: GithubProps) {
  return (
    <div
      className={clsx(
        'bg-muted/10 flex flex-col justify-between space-y-3 rounded-lg p-3 duration-300',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <div>
          <div className="text-lg font-bold">{repo.name}</div>
          <Date dateString={repo.updated_at} className="text-subtle text-xs" />
        </div>
        <div className="inline-flex items-center text-lg">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github repository"
            className="p-1"
          >
            <GithubLogoIcon weight="duotone" />
          </a>
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Home page"
            className="p-1"
          >
            <GlobeIcon weight="duotone" />
          </a>
        </div>
      </div>
      <div>{repo.description}</div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <StarIcon size="1em" weight="bold" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitForkIcon size="1em" weight="bold" />
          <span>{repo.forks_count}</span>
        </div>
      </div>
    </div>
  )
}
