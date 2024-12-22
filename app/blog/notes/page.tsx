import type { Note } from 'content-collections'
import type { Metadata } from 'next'
import { Tag } from '@phosphor-icons/react/dist/ssr'
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
    <div className="flex flex-row max-md:flex-col max-md:gap-5">
      <div className="sticky top-8 h-fit flex-1 max-md:static">
        <h2 className="font-bold">{note.title}</h2>
        <div className="flex flex-col gap-5 max-md:flex-row max-md:justify-between">
          <Date
            dateString={note.date}
            dateFormat="LLL dd, yyyy"
            className="text-sm"
          />
          <div className="flex flex-col gap-1 text-sm max-md:flex-row max-md:gap-3">
            {note.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1">
                <Tag />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-3/4 max-md:w-full">
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
      <div className="flex flex-col gap-12">
        {noteList.map((note) => (
          <NoteItem note={note} key={note.title} />
        ))}
      </div>
    </article>
  )
}
