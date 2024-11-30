// import {
//   ArrowUpRight,
//   Coffee,
//   DownloadSimple,
//   GitFork,
//   Globe,
//   Star,
// } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

// import { getGithubRepo } from '@/lib/github'

// import { GithubLogo } from '~/app/about/sections/contact/icons'
// import { Date } from '~/components/date'

export async function Github() {
  // const repoData = await getGithubRepo()

  return (
    <div className="w-full space-y-4 rounded-xl border p-5 text-sm shadow-md">
      <header className="flex justify-between gap-3">
        <div className="flex items-center gap-1">
          {/* <Coffee /> */}
          <span>Currently making...</span>
        </div>
        <Link href="/projects" className="opacity-80 hover:opacity-100">
          see projects
        </Link>
      </header>
      {/* <div className="space-y-3 rounded-xl border border-neutral-200 p-2 dark:border-neutral-800">
        <div>
          <div className="flex items-start justify-between gap-1">
            <div>
              <div className="font-medium">{repoData.name}</div>
              <div className="text-xs opacity-80">
                <Date dateString={repoData.updated_at} />
              </div>
            </div>
            <div className="inline-flex items-center text-base">
              <a
                href={repoData.html_url}
                target="_blank"
                className="rounded p-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-800"
              >
                <GithubLogo size="1em" />
              </a>
              <a
                href={repoData.homepage}
                target="_blank"
                className="rounded p-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-800"
              >
                <Globe size="1em" />
              </a>
            </div>
          </div>
        </div>
        <div>{repoData.description}</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span>
              <Star size="1em" />
            </span>
            <span>{repoData.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>
              <GitFork size="1em" />
            </span>
            <span>{repoData.forks_count}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <a
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-700/10 p-3 leading-none text-neutral-700 transition hover:bg-neutral-700 hover:text-white dark:bg-neutral-400/10 dark:text-neutral-400 dark:hover:bg-neutral-400 dark:hover:text-black"
          target="_blank"
          href="/assets/cv-mateus-felipe.pdf"
        >
          Download CV <DownloadSimple size="1em" />
        </a>
        <a
          className="flex items-end justify-center rounded-xl p-3 leading-none underline opacity-70 hover:opacity-100"
          target="_blank"
          href="https://read.cv/mateusfelipe/?ref=https://mateusf.com"
        >
          <span>read.cv</span>
          <ArrowUpRight className="text-xs" size="1em" />
        </a>
      </div> */}
    </div>
  )
}
