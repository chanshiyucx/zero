import { sortedNotes } from '@/lib/utils/content'
import { NoteItem } from './NoteItem'

export function NoteList() {
  const noteList = sortedNotes()

  return (
    <div className="flex flex-col gap-3">
      {noteList.map((note) => (
        <NoteItem note={note} key={note.title} />
      ))}
    </div>
  )
}
