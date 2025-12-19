import type { Metadata } from 'next'
import { Card } from '@/components/card'
import { Github } from '@/components/github'
import { PageLayout } from '@/components/page'
import { getGithubRepositories } from '@/lib/api/github'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A personal portfolio showcasing my active and past projects, websites, apps, and more.',
  keywords: ['projects', 'portfolio', 'programming', 'softwares', 'apps'],
}

export default async function Page() {
  const repositories = await getGithubRepositories()

  return (
    <PageLayout title="Code flows like pure poetry.">
      <ul
        style={{ '--enter-start': '100ms' }}
        className="slide-auto grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {repositories.map((repo) => (
          <li key={repo.name}>
            <Card>
              <Github
                repo={repo}
                className="bg-surface hover:bg-overlay transition"
              />
            </Card>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}
