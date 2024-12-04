// import { TIL } from '#content'
// import { slug } from '~/lib/slug'
import type { Note } from 'content-collections'
// import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'

interface NoteItemProps {
  note: Note
}

export function NoteItem({ note }: NoteItemProps) {
  return (
    <div className="relative flex flex-row gap-3 border py-12 first:pt-0 last:border-none">
      <div className="top-24 h-fit flex-1 space-y-2 md:sticky md:space-y-5">
        <div className="space-y-3">
          <h2 className="text-xl font-bold">{note.title}</h2>
          <span className="text-sm">
            <Date dateString={note.date} />
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {/* {note.tags.map((tag) => (
            <Link
              href={`/blog/tag/${slug(tag)}`}
              className="rounded-lg bg-neutral-400/10 p-1 text-sm leading-none transition-colors hover:bg-neutral-400/20"
              key={tag}
            >
              {tag}
            </Link>
          ))} */}
        </div>
      </div>
      <div className="post-content node-content relative md:w-2/3">
        {/* <span className="absolute -top-24" id={slug(node.title)} /> */}
        <MDX code={note.contentCode} />
      </div>
    </div>
  )
}
