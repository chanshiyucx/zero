import type { Note } from 'content-collections'
import type { Metadata } from 'next'
import { CalendarBlank, Tag } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { Divider } from '@/components/ui/divider'
import { MDX } from '@/components/ui/mdx'
import { sortedNotes } from '@/lib/utils/content'

interface NoteItemProps {
  note: Note
}

export const metadata: Metadata = {
  title: 'Notes',
  description: 'A collection of notes on things I have learned recently.',
  keywords: ['blog', 'notes', 'learn', 'study', 'skills'],
}

function NoteItem({ note }: NoteItemProps) {
  return (
    <div>
      <div className="sticky top-0 z-10 flex flex-1 flex-row items-center justify-between bg-base py-3">
        <Link className="link-hover text-2xl font-bold" href={note.url}>
          <h2 className="inline text-text">{note.title}</h2>
        </Link>
        <div className="flex gap-5 text-subtle">
          <span className="inline-flex items-center gap-1">
            <CalendarBlank weight="bold" />
            <Date dateString={note.date} dateFormat="LLL dd, yyyy" />
          </span>
          <span className="flex gap-3">
            {note.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1">
                <Tag weight="bold" />
                {tag}
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className="w-full pb-12 pt-2">
        <MDX code={note.contentCode} />
      </div>
    </div>
  )
}

export default function Page() {
  const noteList = sortedNotes()

  return (
    <article className="page">
      <header>
        <h1 className="text-4xl font-extrabold">Notes are memory anchors.</h1>
      </header>
      <div className="flex flex-col gap-8">
        {noteList.map((note, index) => (
          <div key={note.title}>
            <NoteItem note={note} />
            {index < noteList.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </article>
  )
}
