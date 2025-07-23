import type { Content, ContentGroup } from '@/lib/utils/content'
import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Date } from '@/components/ui/date'

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
    <span className={clsx('ml-6 inline-block w-16 text-sm', extraInfo.color)}>
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
      <section>
        {groups.map((group) => (
          <div key={group.year}>
            <p className="text-right text-3xl font-extrabold">{group.year}</p>
            <ul className="space-y-2 max-md:space-y-4">
              {group.list.map((article) => (
                <li key={article.title}>
                  <Link
                    className="flex gap-6 max-md:flex-col max-md:gap-1"
                    href={article.url}
                  >
                    <span className="max-md:text-sm">
                      <Date
                        dateString={article.date}
                        className="text-subtle inline-block w-16 shrink-0"
                      />
                      {extractInfo && renderExtraInfo(extractInfo(article))}
                    </span>
                    <span className="link-hover text-text overflow-x-hidden text-ellipsis whitespace-nowrap">
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
