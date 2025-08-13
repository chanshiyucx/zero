import { CalendarBlankIcon, TagIcon } from '@phosphor-icons/react/dist/ssr'
import { type Note } from 'content-collections'
import { type Metadata } from 'next'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { Divider } from '@/components/ui/divider'
import { MDX } from '@/components/ui/mdx'
import {
  StaggeredFadeInContainer,
  StaggeredFadeInItem,
} from '@/components/ui/stagger'
import { Toc } from '@/components/ui/toc'
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
      <header className="bg-base sticky top-0 z-10 flex flex-1 flex-row items-center justify-between py-3 max-md:flex-col max-md:items-start">
        <Link className="link-hover text-2xl font-bold" href={note.url}>
          <h2 className="text-text inline" id={note.slug}>
            {note.title}
          </h2>
        </Link>
        <div className="text-subtle mt-1 flex shrink-0 gap-5">
          <span className="inline-flex items-center gap-1">
            <CalendarBlankIcon weight="bold" />
            <Date dateString={note.date} dateFormat="LLL dd, yyyy" />
          </span>
          <span className="flex gap-3">
            {note.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1">
                <TagIcon weight="bold" />
                {tag}
              </span>
            ))}
          </span>
        </div>
      </header>
      <section className="w-full pt-2 pb-12">
        <MDX contentCode={note.contentCode} />
      </section>
    </div>
  )
}

export default function Page() {
  const noteList = sortedNotes
  const toc = noteList.map((note) => ({
    id: note.slug,
    title: note.title,
    depth: 2,
  }))

  return (
    <StaggeredFadeInContainer as="main" className="page">
      <StaggeredFadeInItem as="header">
        <h1 className="text-4xl font-extrabold">Notes are memory anchors.</h1>
      </StaggeredFadeInItem>
      <StaggeredFadeInItem as="section" className="flex flex-row">
        <article className="w-full">
          <div className="flex flex-col gap-8">
            {noteList.map((note, index) => (
              <div key={note.title}>
                <NoteItem note={note} />
                {index < noteList.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </article>
        {toc.length > 0 && <Toc toc={toc} />}
      </StaggeredFadeInItem>
    </StaggeredFadeInContainer>
  )
}
