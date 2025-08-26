import { type Metadata } from 'next'
import { PageLayout } from '@/components/layout/page'
import { Card } from '@/components/ui/card'
import { Github } from '@/components/ui/github'
import { StaggeredFadeInItem } from '@/components/ui/stagger'
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
      <ul className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {repositories.map((repo) => (
          <StaggeredFadeInItem as="li" key={repo.name}>
            <Card>
              <Github
                repo={repo}
                className="bg-surface hover:bg-muted/10 transition"
              />
            </Card>
          </StaggeredFadeInItem>
        ))}
      </ul>
    </PageLayout>
  )
}
