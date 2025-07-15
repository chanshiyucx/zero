import type { Metadata } from 'next'
import clsx from 'clsx'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { groupByYear, sortedClippings } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Clippings',
  description: 'Clipped English and German articles from around the web.',
  keywords: ['clippings', 'english', 'german'],
}

const colors = {
  German: 'text-foam',
  English: 'text-gold',
}

const getTag = (tag: string) => tag.split('/')[0] as keyof typeof colors

export default async function Page() {
  const clippingList = sortedClippings()
  const clippingGroupList = groupByYear(clippingList)

  return (
    <main className="page">
      <header>
        <h1 className="text-4xl font-extrabold">
          Clippings echo silent minds.
        </h1>
      </header>
      <section>
        {clippingGroupList.map((group) => (
          <div key={group.year}>
            <p className="text-right text-3xl font-extrabold">{group.year}</p>
            <ul className="space-y-2">
              {group.list.map((clipping) => {
                const tag = getTag(clipping.tags[0])
                return (
                  <li key={clipping.title}>
                    <Link className="flex gap-6" href={clipping.url}>
                      <Date
                        dateString={clipping.date}
                        className="text-subtle w-16 shrink-0"
                      ></Date>
                      <span className={clsx('w-16 text-sm', colors[tag])}>
                        {tag}
                      </span>
                      <span className="link-hover text-text overflow-x-hidden text-ellipsis whitespace-nowrap">
                        {clipping.title}
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
