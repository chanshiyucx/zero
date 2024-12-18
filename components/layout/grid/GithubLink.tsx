import Image from 'next/image'
import { getGithubRepositories, getGithubUserData } from '@/lib/api'
import { config } from '@/lib/constants/config'

interface GitHubStatsDataProps {
  label: string
  value: number
}

function GitHubStatsData({ label, value }: GitHubStatsDataProps) {
  return (
    <div>
      <span className="mr-1 text-sm">{label}:</span>
      {value}
    </div>
  )
}

export async function GithubLink() {
  const { followers, public_repos } = await getGithubUserData()
  const repositories = await getGithubRepositories()
  const stars = repositories.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0,
  )

  return (
    <a
      href={config.links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="card relative block h-36 w-full bg-surface text-base"
    >
      <Image
        src="/assets/cat.jpg"
        alt="Cat"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="-z-10 object-cover brightness-50"
      />
      <div className="h-full p-3 font-bold">
        <h2 className="p-1 text-xl">@chanshiyucx</h2>
        <div className="absolute bottom-3 right-5 flex flex-col flex-wrap gap-2 self-end">
          <GitHubStatsData label="Stars" value={stars} />
          <GitHubStatsData label="Followers" value={followers} />
          <GitHubStatsData label="Repos" value={public_repos} />
        </div>
      </div>
    </a>
  )
}
