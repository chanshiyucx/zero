import { CalendarBlankIcon, TagIcon } from '@phosphor-icons/react/dist/ssr'
import { type Note } from 'content-collections'
import { type Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { PageLayout } from '@/components/layout/page'
import { DateTime } from '@/components/ui/datetime'
import { Divider } from '@/components/ui/divider'
import { MDX } from '@/components/ui/mdx'
import { sortedNotes } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'A collection of notes on things I have learned recently.',
  keywords: ['blog', 'notes', 'learn', 'study', 'skills'],
}

function NoteItem({ note }: { note: Note }) {
  return (
    <article>
      <header
        style={{ '--stagger': 1 }}
        className="flex flex-1 flex-row items-center justify-between py-3 max-md:flex-col max-md:items-start"
      >
        <Link className="link-hover text-2xl font-bold" href={note.url}>
          <h2 className="text-text inline" id={note.slug}>
            {note.title}
          </h2>
        </Link>
        <div className="text-subtle mt-1 flex shrink-0 gap-5">
          <span className="inline-flex items-center gap-1">
            <CalendarBlankIcon weight="bold" />
            <DateTime dateString={note.date} dateFormat="LLL dd, yyyy" />
          </span>
          <span className="flex gap-3">
            <span className="inline-flex items-center gap-1">
              <TagIcon weight="bold" />
              {note.tags.at(-1)}
            </span>
          </span>
        </div>
      </header>
      <MDX
        className="pt-2 pb-3"
        staggerStart={100}
        contentCode={note.contentCode}
      />
    </article>
  )
}

export default function Page() {
  return (
    <PageLayout title="Notes are memory anchors.">
      <section className="space-y-8">
        {sortedNotes.map((note, index) => (
          <Fragment key={note.slug}>
            <NoteItem note={note} />
            {index < sortedNotes.length - 1 && <Divider />}
          </Fragment>
        ))}
      </section>
    </PageLayout>
  )
}
