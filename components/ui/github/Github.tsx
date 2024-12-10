import type { Repository } from '@/lib/request'
import {
  GitFork,
  GithubLogo,
  Globe,
  Star,
} from '@phosphor-icons/react/dist/ssr'
import { Date } from '@/components/ui/date'

interface GithubProps {
  repo: Repository
}

export function Github({ repo }: GithubProps) {
  return (
    <div className="flex flex-col justify-between space-y-3 rounded-lg bg-muted/10 p-3 transition-all duration-300 hover:bg-muted/20">
      <div className="flex items-start justify-between gap-1">
        <div>
          <div className="text-lg font-bold">{repo.name}</div>
          <Date dateString={repo.updated_at} className="text-xs text-subtle" />
        </div>
        <div className="inline-flex items-center text-lg">
          <a href={repo.html_url} target="_blank" className="p-1">
            <GithubLogo weight="duotone" />
          </a>
          <a href={repo.homepage} target="_blank" className="p-1">
            <Globe weight="duotone" />
          </a>
        </div>
      </div>
      <div>{repo.description}</div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star size="1em" weight="bold" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>
            <GitFork size="1em" weight="bold" />
          </span>
          <span>{repo.forks_count}</span>
        </div>
      </div>
    </div>
  )
}
