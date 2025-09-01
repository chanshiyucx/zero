import { CalendarBlankIcon } from '@phosphor-icons/react/dist/ssr'
import { type Album } from 'content-collections'
import { type Metadata } from 'next'
import { PageLayout } from '@/components/layout/page'
import { DateTime } from '@/components/ui/datetime'
import { MDX } from '@/components/ui/mdx'
import { sortedAlbums } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Album',
  description:
    'A collection of my photography, each image capturing a unique moment and emotion.',
  keywords: ['album', 'photo', 'photography', 'travel'],
}

function AlbumItem({ album }: { album: Album }) {
  return (
    <article>
      <header className="flex flex-row items-center justify-between py-3">
        <h2 className="text-2xl font-bold">{album.title}</h2>
        <span className="text-subtle inline-flex shrink-0 items-center gap-1">
          <CalendarBlankIcon weight="bold" />
          <DateTime dateString={album.date} dateFormat="LLL dd, yyyy" />
        </span>
      </header>
      <MDX className="pt-2" contentCode={album.contentCode} />
    </article>
  )
}

export default function Page() {
  return (
    <PageLayout title="Photography freezes time.">
      <section className="slide-auto space-y-8">
        {sortedAlbums.map((album) => (
          <AlbumItem album={album} key={album.title} />
        ))}
      </section>
    </PageLayout>
  )
}
