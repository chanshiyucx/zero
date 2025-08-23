import { type Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Github } from '@/components/ui/github'
import {
  StaggeredFadeInContainer,
  StaggeredFadeInItem,
} from '@/components/ui/stagger'
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
    <StaggeredFadeInContainer as="main" className="page">
      <StaggeredFadeInItem as="header">
        <h1 className="text-4xl font-extrabold max-md:text-3xl">
          Code flows like pure poetry.
        </h1>
      </StaggeredFadeInItem>
      <StaggeredFadeInItem
        as="ul"
        className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {repositories.map((repo) => (
          <li key={repo.name}>
            <Card>
              <Github
                repo={repo}
                className="bg-surface hover:bg-muted/10 transition"
              />
            </Card>
          </li>
        ))}
      </StaggeredFadeInItem>
    </StaggeredFadeInContainer>
  )
}
