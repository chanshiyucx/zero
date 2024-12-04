import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'
import { sortedAlbums } from '@/lib/content'

export default function Page() {
  const albumList = sortedAlbums()

  return (
    <article className="page space-y-20">
      <header>
        <h1 className="text-4xl font-extrabold">Photography freezes time.</h1>
      </header>
      <div className="space-y-12">
        {albumList.map((album) => (
          <div key={album.title}>
            <p className="mb-5 flex gap-5 text-xl">
              <Date
                dateString={album.date}
                dateFormat="LLL dd, yyyy"
                className="text-subtle"
              />
              {album.title}
            </p>
            <MDX
              code={album.contentCode}
              classname="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-3 album grid-template-rows"
            />
          </div>
        ))}
      </div>
    </article>
  )
}
