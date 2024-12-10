import {
  Coffee,
  DownloadSimple,
  GitFork,
  GithubLogo,
  Globe,
  Star,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { config } from '@/lib/config'
import { getGithubRepo } from '@/lib/request'

export async function Github() {
  const repo = await getGithubRepo()

  return (
    <div className="h-fit w-[20rem] shrink-0 space-y-4 rounded-lg border bg-surface p-5 text-sm max-md:w-full">
      <header className="flex justify-between gap-3">
        <div className="flex items-center gap-1">
          <Coffee weight="duotone" className="text-lg" />
          <span>Currently making...</span>
        </div>
        <Link href="/projects" className="link">
          Projects
        </Link>
      </header>
      <div className="space-y-3 rounded-lg bg-muted/10 p-2">
        <div className="flex items-start justify-between gap-1">
          <div>
            <div className="text-lg">{repo.name}</div>
            <Date
              dateString={repo.updated_at}
              className="text-xs text-subtle"
            />
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
            <GitFork size="1em" weight="bold" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <a
          className="tiny-thumb flex flex-1 items-center justify-center gap-2 border-none"
          target="_blank"
          href={config.links.cvPdf}
        >
          Download CV <DownloadSimple size="1em" weight="bold" />
        </a>
        <a
          className="link p-3 underline"
          target="_blank"
          href={config.links.cv}
        >
          read.cv
        </a>
      </div>
    </div>
  )
}
