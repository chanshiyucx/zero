import type { Metadata } from 'next'
import { NoteList } from '@/components/layout/note/NoteList'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'A collection of notes on things I’ve learned recently.',
  keywords: ['notes', 'learn', 'study', 'skills'],
}

export default function Page() {
  return (
    <div className="page">
      <NoteList />
    </div>
  )
}
