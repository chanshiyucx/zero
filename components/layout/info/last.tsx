import { type Icon } from '@phosphor-icons/react'
import {
  CameraIcon,
  CodepenLogoIcon,
  FlowerTulipIcon,
  ScrollIcon,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { DateTime } from '@/components/ui/datetime'
import { MDX } from '@/components/ui/mdx'
import {
  sortedAlbums,
  sortedArticles,
  sortedJournals,
  sortedSnippets,
  sortedVibes,
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
        <Link className="link link-active text-sm" href={href}>
          View All
        </Link>
      </div>
      <ul className="space-y-2 max-md:space-y-4">
        {list.map((content) => (
          <li key={content.slug}>
            <Link className="flex justify-between" href={content.url}>
              <span className="link text-text truncate max-sm:whitespace-normal">
                {content.title}
              </span>
              <DateTime
                dateString={content.date}
                className="text-subtle text-sm"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Journal() {
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

export function Article() {
  const lastArticles = sortedArticles.slice(0, 5)

  return (
    <List
      title="Article"
      href="/articles"
      list={lastArticles}
      icon={ScrollIcon}
    />
  )
}

export function Snippet() {
  const lastSnippets = sortedSnippets.slice(0, 5)

  return (
    <List
      title="Snippet"
      href="/snippets"
      list={lastSnippets}
      icon={CodepenLogoIcon}
    />
  )
}

export function Vibe() {
  const vibe = sortedVibes[0]
  return (
    <section>
      <MDX key={vibe.title} staggerStart={100} contentCode={vibe.contentCode} />
    </section>
  )
}

export function Album() {
  const album = sortedAlbums[0]

  return (
    <section className="space-y-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <CameraIcon size="18" weight="bold" />
          <h2 className="font-bold">Album</h2>
        </div>
        <Link className="link link-active text-sm" href="/album">
          View All
        </Link>
      </div>
      <article className="border-overlay border-b pb-12 last:border-b-0 last:pb-0">
        <header className="mb-3 flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1">
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
