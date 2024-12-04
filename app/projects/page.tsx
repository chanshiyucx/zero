import {
  GitFork,
  GithubLogo,
  Globe,
  Star,
} from '@phosphor-icons/react/dist/ssr'
import { Date } from '@/components/ui/date'
import { getGithubRepositories } from '@/lib/github'

export default async function Page() {
  let repositories = await getGithubRepositories()
  repositories = repositories.filter((repo) => repo.stargazers_count > 5)
  repositories.sort((a, b) => b.stargazers_count - a.stargazers_count)

  return (
    <article className="page space-y-20">
      <header>
        <h1 className="text-4xl font-extrabold">
          Good software, like wine, takes time.
        </h1>
      </header>
      <ul className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-3">
        {repositories.map((repo) => (
          <li key={repo.name}>
            <div className="flex h-full flex-col justify-between space-y-3 rounded-lg bg-muted/10 p-2">
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
          </li>
        ))}
      </ul>
    </article>
  )
}
