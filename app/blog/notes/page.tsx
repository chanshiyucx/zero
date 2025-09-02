import { CalendarBlankIcon, TagIcon } from '@phosphor-icons/react/dist/ssr'
import { type Note } from 'content-collections'
import { type Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { PageLayout } from '@/components/layout/page'
import { DateTime } from '@/components/ui/datetime'
import { MDX } from '@/components/ui/mdx'
import { sortedNotes } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'A collection of notes on things I have learned recently.',
  keywords: ['blog', 'notes', 'learn', 'study', 'skills'],
}

function NoteItem({ note }: { note: Note }) {
  return (
    <article className="border-overlay border-b pb-12 last:border-b-0 last:pb-0">
      <header
        style={{ '--enter-stagger': 1 }}
        className="mb-5 flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1"
      >
        <Link className="link-hover text-2xl font-bold" href={note.url}>
          <h2 id={note.slug}>{note.title}</h2>
        </Link>
        <div className="text-subtle flex shrink-0 gap-5">
          <span className="inline-flex items-center gap-1">
            <CalendarBlankIcon weight="bold" />
            <DateTime dateString={note.date} />
          </span>
          <span className="inline-flex items-center gap-1">
            <TagIcon weight="bold" />
            {note.tags.at(-1)}
          </span>
        </div>
      </header>
      <MDX staggerStart={100} contentCode={note.contentCode} />
    </article>
  )
}

export default function Page() {
  return (
    <PageLayout title="Notes are memory anchors.">
      <section className="space-y-12">
        {sortedNotes.map((note, index) => (
          <Fragment key={note.slug}>
            <NoteItem note={note} />
            {index < sortedNotes.length - 1 && (
              <div style={{ '--enter-stagger': 0 }}>{/* <Divider /> */}</div>
            )}
          </Fragment>
        ))}
      </section>
    </PageLayout>
  )
}
