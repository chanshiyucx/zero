import type { Album } from 'content-collections'
import type { Metadata } from 'next'
import { DateTime } from '@/components/datetime'
import { MDX } from '@/components/mdx'
import { PageLayout } from '@/components/page'
import { sortedAlbums } from '@/lib/utils/content'
import { cn } from '@/lib/utils/style'

export const metadata: Metadata = {
  title: 'Album',
  description:
    'A collection of my photography, each image capturing a unique moment and emotion.',
  keywords: ['album', 'photo', 'photography', 'travel'],
}

function AlbumItem({ album, isFirst }: { album: Album; isFirst: boolean }) {
  return (
    <article>
      <header
        data-slide
        className={cn(
          'mb-6 flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1',
          isFirst ? 'border-t-0 pt-0' : 'border-t pt-12',
        )}
      >
        <h2 className="text-lg font-bold">{album.title}</h2>
        <DateTime
          dateString={album.date}
          className="text-subtle shrink-0 text-sm"
        />
      </header>
      <MDX contentCode={album.contentCode} />
    </article>
  )
}

export default function Page() {
  return (
    <PageLayout title="Photography freezes time.">
      <div className="space-y-12">
        {sortedAlbums.map((album, index) => (
          <AlbumItem key={album.title} album={album} isFirst={index === 0} />
        ))}
      </div>
    </PageLayout>
  )
}
