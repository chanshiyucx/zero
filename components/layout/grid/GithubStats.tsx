import { config } from '@/lib/config'
import { random } from '@/lib/helper'
import { getGithubRepositories, getGithubUserData } from '@/lib/request'

interface GitHubStatsDataProps {
  label: string
  value: number
}

function BackgroundPattern() {
  const colours = ['#39d353', '#0e4429', '#0e4429', '#006d32', '#161b22']
  const days = new Array(62)
    .fill(null)
    .map(() => colours[random(0, colours.length)])

  return (
    <div className="z-0 grid grid-cols-[repeat(15,minmax(0,1fr))] place-items-center gap-1 px-2 py-3 opacity-90">
      {days.map((c, i) => (
        <div key={i} className="size-3 rounded" style={{ background: c }} />
      ))}
    </div>
  )
}

function GitHubStatsData({ label, value }: GitHubStatsDataProps) {
  return (
    <div className="font-bold">
      <span className="mr-1 text-sm text-subtle">{label}:</span>
      {value}
    </div>
  )
}

export async function GithubStats() {
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
      className="card relative block h-full w-full bg-surface"
    >
      <BackgroundPattern />
      <div className="flex flex-row flex-wrap gap-x-6 p-2 max-md:gap-x-4">
        <GitHubStatsData label="Stars" value={stars} />
        <GitHubStatsData label="Followers" value={followers} />
        <GitHubStatsData label="Repos" value={public_repos} />
      </div>
    </a>
  )
}
