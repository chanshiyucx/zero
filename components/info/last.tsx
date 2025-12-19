import type { Icon } from '@phosphor-icons/react'
import {
  BriefcaseIcon,
  CodepenLogoIcon,
  FlowerTulipIcon,
  InstagramLogoIcon,
  ScrollIcon,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Card } from '@/components/card'
import { DateTime } from '@/components/datetime'
import { Github } from '@/components/github'
import { MDX } from '@/components/mdx'
import { getGithubRepositories } from '@/lib/api/github'
import {
  sortedAlbums,
  sortedArticles,
  sortedJournals,
  sortedSnippets,
  type Content,
} from '@/lib/utils/content'

interface ListProps {
  title: string
  href: string
  icon: Icon
  list: Content[]
}

function List({ title, href, icon: Icon, list }: ListProps) {
  return (
    <section className="space-y-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Icon size="18" weight="bold" />
          <h2 className="font-bold">{title}</h2>
        </div>
        <Link className="link text-sm" href={href}>
          View All
        </Link>
      </div>
      <ul className="space-y-2 max-md:space-y-4">
        {list.map((content) => (
          <li key={content.slug} className="flex items-center justify-between">
            <Link
              href={content.url}
              className="link link-hover text-text truncate max-sm:whitespace-normal"
            >
              {content.title}
            </Link>
            <DateTime
              dateString={content.date}
              className="text-subtle shrink-0 text-sm"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Journal() {
  const lastJournals = sortedJournals.slice(0, 5)

  return (
    <List
      title="Journal"
      href="/journal"
      list={lastJournals}
      icon={FlowerTulipIcon}
    />
  )
}

function Article() {
  const lastArticles = sortedArticles.slice(0, 5)

  return (
    <List
      title="Articles"
      href="/articles"
      list={lastArticles}
      icon={ScrollIcon}
    />
  )
}

function Snippet() {
  const lastSnippets = sortedSnippets.slice(0, 5)

  return (
    <List
      title="Snippets"
      href="/snippets"
      list={lastSnippets}
      icon={CodepenLogoIcon}
    />
  )
}

function Gallery() {
  const album = sortedAlbums[0]

  if (!album) return null

  return (
    <section className="space-y-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <InstagramLogoIcon size="18" weight="bold" />
          <h2 className="font-bold">Gallery</h2>
        </div>
        <Link className="link text-sm" href="/gallery">
          View All
        </Link>
      </div>
      <article className="border-overlay border-b pb-12 last:border-b-0 last:pb-0">
        <header className="mb-3 flex flex-row items-center justify-between">
          <span className="text-text truncate max-sm:whitespace-normal">
            {album.title}
          </span>
          <DateTime
            dateString={album.date}
            className="text-subtle shrink-0 text-sm"
          />
        </header>
        <MDX contentCode={album.contentCode} />
      </article>
    </section>
  )
}

async function Project() {
  const repositories = await getGithubRepositories()
  const lastRepositories = repositories.slice(0, 3)
  return (
    <section className="space-y-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <BriefcaseIcon size="18" weight="bold" />
          <h2 className="font-bold">Projects</h2>
        </div>
        <Link className="link text-sm" href="/projects">
          View All
        </Link>
      </div>
      <ul className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {lastRepositories.map((repo) => (
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
    </section>
  )
}

export function Last() {
  return (
    <div className="slide-auto space-y-12" style={{ '--enter-start': '300ms' }}>
      <Gallery />
      <Journal />
      <Article />
      <Snippet />
      <Project />
    </div>
  )
}
