import type { Metadata } from 'next'
import { Github } from '@/components/ui/github'
import { getGithubRepositories } from '@/lib/request'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A personal portfolio showcasing my active and past projects, websites, apps, and more.',
  keywords: ['projects', 'portfolio', 'programming', 'softwares', 'apps'],
}

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
      <ul className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-3 max-md:grid-cols-[repeat(2,minmax(0,1fr))]">
        {repositories.map((repo) => (
          <li key={repo.name}>
            <Github repo={repo} />
          </li>
        ))}
      </ul>
    </article>
  )
}
