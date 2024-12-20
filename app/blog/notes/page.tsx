import type { Note } from 'content-collections'
import type { Metadata } from 'next'
import { Tag } from '@phosphor-icons/react/dist/ssr'
import { Switcher } from '@/components/layout/switcher'
import { Date } from '@/components/ui/date'
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
    <div className="flex flex-row border py-12 first:pt-0 last:border-none">
      <div className="sticky top-8 h-fit flex-1 space-y-3">
        <h2 className="font-bold">{note.title}</h2>
        <Date
          dateString={note.date}
          dateFormat="LLL dd, yyyy"
          className="text-sm"
        />
        <div className="text-sm">
          {note.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1">
              <Tag />
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="w-3/4">
        <MDX code={note.contentCode} />
      </div>
    </div>
  )
}

export default function Page() {
  const noteList = sortedNotes()

  return (
    <article className="page">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">Notes are memory anchors.</h1>
        <Switcher />
      </header>
      <div className="flex flex-col gap-3">
        {noteList.map((note) => (
          <NoteItem note={note} key={note.title} />
        ))}
      </div>
    </article>
  )
}
