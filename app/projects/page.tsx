import type { Metadata } from 'next'
import { Github } from '@/components/ui/github'
import { getGithubRepositories } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A personal portfolio showcasing my active and past projects, websites, apps, and more.',
  keywords: ['projects', 'portfolio', 'programming', 'softwares', 'apps'],
}

export default async function Page() {
  const repositories = await getGithubRepositories()

  return (
    <article className="page">
      <header>
        <h1 className="text-4xl font-extrabold">
          Keep it simple, but not simpler.
        </h1>
      </header>
      <ul className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-3 max-md:grid-cols-[repeat(2,minmax(0,1fr))]">
        {repositories.map((repo) => (
          <li key={repo.name}>
            <Github
              repo={repo}
              className="bg-surface transition target:ring hover:bg-muted/10 focus:outline-none focus:ring"
            />
          </li>
        ))}
      </ul>
    </article>
  )
}
