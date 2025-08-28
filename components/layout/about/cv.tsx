import { CoffeeIcon, DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Github } from '@/components/ui/github'
import { StaggeredFadeInItem } from '@/components/ui/stagger'
import { getGithubRepo } from '@/lib/api/github'
import { siteConfig } from '@/lib/constants/config'

export async function CV() {
  const repo = await getGithubRepo()

  return (
    <StaggeredFadeInItem className="bg-surface mt-2 h-fit w-[20rem] shrink-0 space-y-4 rounded-lg border p-5 text-sm max-md:mt-0 max-md:w-full">
      <header className="flex justify-between gap-3">
        <div className="flex items-center gap-1">
          <CoffeeIcon weight="duotone" className="text-lg" />
          <span>Currently making...</span>
        </div>
        <Link href="/projects" className="link">
          Projects
        </Link>
      </header>
      <Github repo={repo} className="hover:bg-muted/20" />
      <div className="flex items-center gap-5">
        <a
          href={siteConfig.links.cvPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="tiny-button flex flex-1 items-center justify-center gap-2 border-none py-3 no-underline"
        >
          Download CV <DownloadSimpleIcon size="1em" weight="bold" />
        </a>
        <a
          href={siteConfig.links.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Read CV
        </a>
      </div>
    </StaggeredFadeInItem>
  )
}
