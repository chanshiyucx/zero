import Link from 'next/link'
import { Fragment } from 'react'
import { DateTime } from '@/components/datetime'
import { PageLayout } from '@/components/page'
import type { ContentGroup } from '@/lib/utils/content'

interface ListProps {
  title: string
  groups: ContentGroup[]
}

export function List({ title, groups }: ListProps) {
  return (
    <PageLayout title={title}>
      <ul
        data-slide-auto
        className="w-full space-y-2 max-md:space-y-4"
        style={{ '--enter-delay': '50ms' } as React.CSSProperties}
      >
        {groups.map((group) => (
          <Fragment key={group.year}>
            <li className="my-5 text-right text-3xl font-extrabold first:mt-0 max-md:text-2xl">
              {group.year}
            </li>
            {group.list.map((article) => (
              <li
                key={article.slug}
                className="flex items-start justify-start gap-6 max-sm:flex-row-reverse max-sm:justify-between max-sm:gap-0"
              >
                <DateTime
                  dateString={article.date}
                  dateFormat="MMM DD"
                  className="text-subtle inline-block w-16 shrink-0 pt-0.5 text-sm"
                />
                <Link
                  href={article.url}
                  className="link link-hover text-text truncate max-sm:whitespace-normal"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
    </PageLayout>
  )
}
