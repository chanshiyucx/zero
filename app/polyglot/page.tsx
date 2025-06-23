import type { Metadata } from 'next'
import clsx from 'clsx'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { groupByYear, sortedPolyglots } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Polyglot',
  description:
    'My learning journey and insights in English and German languages. Here I document my progress, experiences, and reflections on language learning.',
  keywords: ['polyglot', 'english', 'german'],
}

const colors = {
  German: 'text-foam',
  English: 'text-gold',
}

const getTag = (tag: string) => tag.split('/')[0] as keyof typeof colors

export default async function Page() {
  const polyglotList = sortedPolyglots()
  const polyglotGroupList = groupByYear(polyglotList)

  return (
    <main className="page">
      <header>
        <h1 className="text-4xl font-extrabold">
          Polyglots think beyond one world.
        </h1>
      </header>
      <section>
        {polyglotGroupList.map((group) => (
          <div key={group.year}>
            <p className="text-right text-3xl font-extrabold">{group.year}</p>
            <ul className="space-y-2">
              {group.list.map((polyglot) => {
                const tag = getTag(polyglot.tags[0])
                return (
                  <li key={polyglot.title}>
                    <Link className="flex gap-6" href={polyglot.url}>
                      <Date
                        dateString={polyglot.date}
                        className="text-subtle w-16 shrink-0"
                      ></Date>
                      <span className={clsx('w-16 text-sm', colors[tag])}>
                        {tag}
                      </span>
                      <span className="link-hover text-text overflow-x-hidden text-ellipsis whitespace-nowrap">
                        {polyglot.title}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </section>
    </main>
  )
}
