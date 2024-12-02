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
import { getGithubRepo } from '@/lib/github'

export async function Github() {
  const repoData = await getGithubRepo()

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
        <div>
          <div className="flex items-start justify-between gap-1">
            <div>
              <div className="font-bold">{repoData.name}</div>
              <div className="text-xs opacity-80">
                <Date dateString={repoData.updated_at} />
              </div>
            </div>
            <div className="inline-flex items-center">
              <a
                href={repoData.html_url}
                target="_blank"
                className="rounded p-1 transition"
              >
                <GithubLogo size="1em" weight="duotone" />
              </a>
              <a
                href={repoData.homepage}
                target="_blank"
                className="rounded p-1 transition"
              >
                <Globe size="1em" weight="duotone" />
              </a>
            </div>
          </div>
        </div>
        <div>{repoData.description}</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span>
              <Star size="1em" weight="bold" />
            </span>
            <span>{repoData.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>
              <GitFork size="1em" weight="bold" />
            </span>
            <span>{repoData.forks_count}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <a
          className="tinyThumb flex flex-1 items-center justify-center gap-2 rounded-lg border-none"
          target="_blank"
          href="https://chanshiyucx.github.io/CV/Xin%20Chen%20-%20FrontEnd%20Engineer%20Resume.pdf"
        >
          Download CV <DownloadSimple size="1em" weight="bold" />
        </a>
        <a
          className="link flex items-end justify-center rounded-lg p-3 leading-none underline opacity-70 hover:opacity-100"
          target="_blank"
          href="https://chanshiyucx.github.io/CV/"
        >
          <span>read.cv</span>
        </a>
      </div>
    </div>
  )
}
