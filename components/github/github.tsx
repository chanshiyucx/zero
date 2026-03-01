import {
  GitForkIcon,
  GithubLogoIcon,
  StarIcon,
} from '@phosphor-icons/react/dist/ssr'
import type { Repository } from '@/lib/api/github'
import { cn } from '@/lib/utils/style'

type GithubProps = {
  repo: Repository
  className?: string
}

export function Github({ repo, className }: GithubProps) {
  return (
    <div
      className={cn(
        'bg-overlay flex flex-col justify-between space-y-3 rounded-md p-3 duration-300',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <p className="font-bold">{repo.name}</p>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github repository"
          className="font-bold"
        >
          <GithubLogoIcon weight="duotone" size={18} />
        </a>
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
