import type { Icon } from '@phosphor-icons/react'
import {
  BriefcaseIcon,
  FlowerTulipIcon,
  GhostIcon,
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
  sortedMusings,
  type Content,
} from '@/lib/utils/content'

interface HeaderProps {
  title: string
  href: string
  icon: Icon
}

function Header({ title, href, icon: Icon }: HeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <Icon size="18" weight="bold" />
        <h2 className="font-bold">{title}</h2>
      </div>
      <Link className="link text-sm" href={href}>
        View All
      </Link>
    </div>
  )
}

interface ListProps extends HeaderProps {
  list: Content[]
}

function List({ title, href, icon: Icon, list }: ListProps) {
  return (
    <section className="space-y-3">
      <Header title={title} href={href} icon={Icon} />
      <ul className="space-y-2 max-md:space-y-4">
        {list.map((content) => (
          <li key={content.slug} className="flex items-start justify-between">
            <Link
              href={content.url}
              className="link link-hover text-text truncate max-sm:whitespace-normal"
            >
              {content.title}
            </Link>
            <DateTime
              dateString={content.date}
              className="text-subtle shrink-0 pt-0.5 text-sm"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

interface SectionProps extends HeaderProps {
  content: Content
}

function Section({ title, href, icon: Icon, content }: SectionProps) {
  return (
    <section className="space-y-3">
      <Header title={title} href={href} icon={Icon} />
      <article className="border-overlay border-b pb-12 last:border-b-0 last:pb-0">
        <header className="mb-3 flex flex-row items-center justify-between">
          <h2 className="text-text truncate max-sm:whitespace-normal">
            {content.title}
          </h2>
          <DateTime
            dateString={content.date}
            className="text-subtle shrink-0 text-sm"
          />
        </header>
        <MDX slideMode="none" contentCode={content.contentCode} />
      </article>
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

function Gallery() {
  const album = sortedAlbums[0]
  if (!album) return null

  return (
    <Section
      title="Gallery"
      href="/gallery"
      icon={InstagramLogoIcon}
      content={album}
    />
  )
}

function Musing() {
  const musing = sortedMusings[0]
  if (!musing) return null

  return (
    <Section
      title="Musings"
      href="/musings"
      icon={GhostIcon}
      content={musing}
    />
  )
}

async function Project() {
  const repositories = await getGithubRepositories()
  const lastRepositories = repositories.slice(0, 3)

  return (
    <section className="space-y-3">
      <Header title="Projects" href="/projects" icon={BriefcaseIcon} />
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
    <div data-slide-auto className="space-y-12">
      <Gallery />
      <Musing />
      <Journal />
      <Article />
      <Project />
    </div>
  )
}
