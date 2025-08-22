import { CalendarBlankIcon } from '@phosphor-icons/react/dist/ssr'
import { type Metadata } from 'next'
import { DateTime } from '@/components/ui/datetime'
import { MDX } from '@/components/ui/mdx'
import {
  StaggeredFadeInContainer,
  StaggeredFadeInItem,
} from '@/components/ui/stagger'
import { sortedAlbums } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Album',
  description:
    'A collection of my photography and creative work, each image capturing a unique moment and emotion.',
  keywords: ['album', 'photo', 'photography', 'travel'],
}

export default function Page() {
  const albumList = sortedAlbums

  return (
    <StaggeredFadeInContainer as="main" className="page">
      <StaggeredFadeInItem as="header">
        <h1 className="text-4xl font-extrabold">Photography freezes time.</h1>
      </StaggeredFadeInItem>
      <StaggeredFadeInItem as="section" className="space-y-8">
        {albumList.map((album) => (
          <article key={album.title}>
            <header className="flex flex-row items-center justify-between py-3">
              <h2 className="text-2xl font-bold">{album.title}</h2>
              <span className="text-subtle inline-flex shrink-0 items-center gap-1">
                <CalendarBlankIcon weight="bold" />
                <DateTime dateString={album.date} dateFormat="LLL dd, yyyy" />
              </span>
            </header>
            <section className="pt-2">
              <MDX contentCode={album.contentCode} />
            </section>
          </article>
        ))}
      </StaggeredFadeInItem>
    </StaggeredFadeInContainer>
  )
}
