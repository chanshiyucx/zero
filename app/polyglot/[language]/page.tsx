import type { Metadata } from 'next'
import clsx from 'clsx'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { groupByYear, sortedPolyglots } from '@/lib/utils/content'

interface PageProps {
  params: Promise<{ language: 'english' | 'german' }>
}

export const metadata: Metadata = {
  title: 'Polyglot',
  description:
    'My learning journey and insights in English and German languages. Here I document my progress, experiences, and reflections on language learning.',
  keywords: ['polyglot', 'english', 'german'],
}

const title = {
  english: 'English writing sharpens thinking.',
  german: 'Deutsch ist ein Fenster weiter.',
}

const colors = {
  Grammar: 'text-foam',
  Writing: 'text-gold',
  Lektion: 'text-love',
}

const getTag = (tag: string) => tag.split('/')[1] as keyof typeof colors

export default async function Page({ params }: PageProps) {
  const { language } = await params
  const polyglotList = sortedPolyglots(language)
  const polyglotGroupList = groupByYear(polyglotList)

  return (
    <main className="page">
      <header>
        <h1 className="text-4xl font-extrabold">{title[language]}</h1>
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
