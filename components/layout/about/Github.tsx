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
    <div className="h-fit w-[20rem] space-y-4 rounded-lg border bg-surface p-5 text-sm">
      <header className="flex justify-between gap-3">
        <div className="flex items-center gap-1">
          <Coffee weight="bold" className="text-lg" />
          <span>Currently making...</span>
        </div>
        <Link href="/projects" className="link opacity-80 hover:opacity-100">
          see projects
        </Link>
      </header>
      <div className="space-y-3 rounded-lg bg-muted/10 p-2">
        <div className="flex items-start justify-between gap-1">
          <div>
            <div className="text-lg">{repo.name}</div>
            <div className="text-xs opacity-80">
              <Date dateString={repo.updated_at} />
            </div>
          </div>
          <div className="inline-flex items-center text-lg">
            <a
              href={repo.html_url}
              target="_blank"
              className="rounded p-1 transition"
            >
              <GithubLogo weight="duotone" />
            </a>
            <a
              href={repo.homepage}
              target="_blank"
              className="rounded p-1 transition"
            >
              <Globe weight="duotone" />
            </a>
          </div>
        </div>
        <div>{repo.description}</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span>
              <Star size="1em" weight="bold" />
            </span>
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
      <div className="flex gap-4">
        <a
          className="tiny-thumb flex flex-1 items-center justify-center gap-2 rounded-lg border-none"
          target="_blank"
          href={config.cvPdf}
        >
          Download CV <DownloadSimple size="1em" weight="bold" />
        </a>
        <a
          className="link flex items-end justify-center rounded-lg p-3 underline"
          target="_blank"
          href={config.cv}
        >
          <span>read.cv</span>
        </a>
      </div>
    </div>
  )
}
