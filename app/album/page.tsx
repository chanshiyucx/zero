import type { Metadata } from 'next'
import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'
import { sortedAlbums } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Album',
  description:
    'A collection of my photography and creative work, each image capturing a unique moment and emotion.',
  keywords: ['album', 'photo', 'photography', 'travel'],
}

export default function Page() {
  const albumList = sortedAlbums()

  return (
    <main className="page">
      <header>
        <h1 className="text-4xl font-extrabold">Photography freezes time.</h1>
      </header>
      <section className="space-y-12">
        {albumList.map((album) => (
          <div key={album.title}>
            <p className="mb-5 flex gap-5 text-lg font-bold">
              <Date
                dateString={album.date}
                dateFormat="LLL dd, yyyy"
                className="text-subtle"
              />
              {album.title}
            </p>
            <MDX
              code={album.contentCode}
              classname="grid grid-cols-[repeat(3,minmax(0,1fr))] max-md:grid-cols-[repeat(2,minmax(0,1fr))] gap-3 album grid-template-rows"
            />
          </div>
        ))}
      </section>
    </main>
  )
}
