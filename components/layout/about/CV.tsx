import { Coffee, DownloadSimple } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Github } from '@/components/ui/github'
import { config } from '@/lib/config'
import { getGithubRepo } from '@/lib/request'

export async function CV() {
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
      <Github repo={repo} />
      <div className="flex gap-4">
        <a
          href={config.links.cvPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="tiny-thumb flex flex-1 items-center justify-center gap-2 border-none"
        >
          Download CV <DownloadSimple size="1em" weight="bold" />
        </a>
        <a
          href={config.links.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="link p-3 underline"
        >
          read.cv
        </a>
      </div>
    </div>
  )
}
