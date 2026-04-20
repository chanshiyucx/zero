import type { Icon } from '@phosphor-icons/react'
import {
  BriefcaseIcon,
  FeatherIcon,
  FlowerTulipIcon,
  GhostIcon,
  InstagramLogoIcon,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Card } from '@/components/card'
import { DateTime } from '@/components/datetime'
import { Github } from '@/components/github'
import { MDX } from '@/components/mdx'
import { PhotoView } from '@/components/photo-view'
import { getGithubRepositories } from '@/lib/api/github'
import { getLatestGalleryPhotos, photoGalleryUrl } from '@/lib/api/photo'
import {
  sortedCrafts,
  sortedJournals,
  sortedMusings,
  type Content,
} from '@/lib/utils/content'

type HeaderProps = {
  title: string
  href: string
  icon: Icon
  newTab?: boolean
}

function Header({ title, href, icon: Icon, newTab = false }: HeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <Icon size="18" weight="bold" />
        <h2 className="font-bold">{title}</h2>
      </div>
      <Link
        className="link text-sm"
        href={href}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noreferrer' : undefined}
      >
        View All
      </Link>
    </div>
  )
}

type ListProps = HeaderProps & {
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

function Craft() {
  const lastCrafts = sortedCrafts.slice(0, 5)

  return (
    <List title="Craft" href="/craft" list={lastCrafts} icon={FeatherIcon} />
  )
}

async function Album() {
  const photos = await getLatestGalleryPhotos()
  if (photos.length === 0) return null
  const cover = photos[0]!

  return (
    <section className="space-y-3">
      <Header
        title="Album"
        href={photoGalleryUrl}
        icon={InstagramLogoIcon}
        newTab={true}
      />
      <article className="border-overlay border-b pb-12 last:border-b-0 last:pb-0">
        <header className="mb-3 flex flex-row items-center justify-between">
          <h2 className="text-text truncate max-sm:whitespace-normal">
            {cover.location}
          </h2>
          <DateTime
            dateString={cover.takenAt}
            className="text-subtle shrink-0 text-sm"
          />
        </header>
        <div className="photo-gallery prose prose-img:rounded-md">
          {photos.map((photo, index) => (
            <div
              key={photo.originalSrc}
              className={
                index === photos.length - 1 ? 'max-md:hidden' : undefined
              }
            >
              <PhotoView
                src={photo.thumbnailSrc}
                originalsrc={photo.originalSrc}
                alt={photo.title}
                width={photo.width}
                height={photo.height}
                showCaption={false}
              />
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

function Musing() {
  const musing = sortedMusings[0]
  if (!musing) return null

  return (
    <section className="space-y-3">
      <Header title="Musing" href="/musing" icon={GhostIcon} />
      <article className="border-overlay border-b pb-12 last:border-b-0 last:pb-0">
        <header className="mb-3 flex flex-row items-center justify-between">
          <h2 className="text-text truncate max-sm:whitespace-normal">
            {musing.title}
          </h2>
          <DateTime
            dateString={musing.date}
            className="text-subtle shrink-0 text-sm"
          />
        </header>
        <MDX className="musing" contentCode={musing.contentCode} />
      </article>
    </section>
  )
}

async function Project() {
  const repositories = await getGithubRepositories()
  const lastRepositories = repositories.slice(0, 3)

  return (
    <section className="space-y-3">
      <Header title="Project" href="/project" icon={BriefcaseIcon} />
      <ul className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {lastRepositories.map((repo) => (
          <li key={repo.name}>
            <Card active={true}>
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
    <div data-slide-auto data-slide-start="3" className="space-y-12">
      <Album />
      <Musing />
      <Journal />
      <Craft />
      <Project />
    </div>
  )
}
