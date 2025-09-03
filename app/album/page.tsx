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
    <article className="border-overlay border-b pb-12 last:border-b-0 last:pb-0">
      <header
        style={{ '--enter-stagger': 1 }}
        className="mb-6 flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1"
      >
        <h2 className="text-2xl font-bold">{album.title}</h2>
        <div className="text-subtle shrink-0">
          <span className="inline-flex items-center gap-1">
            <CalendarBlankIcon weight="bold" />
            <DateTime dateString={album.date} />
          </span>
        </div>
      </header>
      <MDX staggerStart={2 * 150} contentCode={album.contentCode} />
    </article>
  )
}

export default function Page() {
  return (
    <PageLayout title="Photography freezes time.">
      <div className="space-y-12">
        {sortedAlbums.map((album) => (
          <AlbumItem key={album.title} album={album} />
        ))}
      </div>
    </PageLayout>
  )
}
