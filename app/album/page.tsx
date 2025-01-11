import type { Metadata } from 'next'
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr'
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
      {/* -translate-y-3 keeps all pages have the same top margin */}
      <section className="-translate-y-3 space-y-12">
        {albumList.map((album) => (
          <article key={album.title}>
            <header className="sticky top-0 z-10 flex flex-row items-center justify-between bg-base py-3">
              <h2 className="text-2xl font-bold">{album.title}</h2>
              <span className="inline-flex items-center gap-1 text-subtle">
                <CalendarBlank weight="bold" />
                <Date dateString={album.date} dateFormat="LLL dd, yyyy" />
              </span>
            </header>
            <section className="pt-2">
              <MDX
                code={album.contentCode}
                classname="grid grid-cols-[repeat(3,minmax(0,1fr))] max-md:grid-cols-[repeat(2,minmax(0,1fr))] gap-3 album grid-template-rows"
              />
            </section>
          </article>
        ))}
      </section>
    </main>
  )
}
