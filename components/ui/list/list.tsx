import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Date } from '@/components/ui/date'
import type { Content, ContentGroup } from '@/lib/utils/content'

export interface ExtraInfo {
  color: string
  text: string
}

interface ListProps {
  title: string
  groups: ContentGroup[]
  extractInfo?: (article: Content) => ExtraInfo
  renderTitle?: (article: Content) => ReactNode
}

function renderExtraInfo(extraInfo: ExtraInfo) {
  return (
    <span
      className={clsx(
        'ml-6 inline-block w-16 text-sm max-md:ml-3',
        extraInfo.color,
      )}
    >
      {extraInfo.text}
    </span>
  )
}

export function List({ title, groups, extractInfo, renderTitle }: ListProps) {
  return (
    <main className="page">
      <header>
        <h1 className="text-4xl font-extrabold">{title}</h1>
      </header>
      <section className="space-y-2">
        {groups.map((group) => (
          <div key={group.year}>
            <p className="text-right text-3xl font-extrabold">{group.year}</p>
            <ul className="space-y-2 max-md:space-y-4">
              {group.list.map((article) => (
                <li key={article.title}>
                  <Link
                    className="flex gap-6 max-sm:flex-col max-sm:gap-0"
                    href={article.url}
                  >
                    <span className="shrink-0 max-md:text-sm">
                      <Date
                        dateString={article.date}
                        className="text-subtle inline-block w-16 shrink-0"
                      />
                      {extractInfo && renderExtraInfo(extractInfo(article))}
                    </span>
                    <span className="link-hover text-text overflow-x-hidden text-ellipsis whitespace-nowrap max-md:whitespace-normal">
                      {renderTitle ? renderTitle(article) : article.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  )
}
