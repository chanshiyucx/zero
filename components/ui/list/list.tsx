import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import { PageLayout } from '@/components/layout/page'
import { DateTime } from '@/components/ui/datetime'
import { type Content, type ContentGroup } from '@/lib/utils/content'
import { cn } from '@/lib/utils/style'

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
      className={cn(
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
    <PageLayout title={title}>
      <ul
        className="slide-auto space-y-2 max-md:space-y-4"
        style={{ '--enter-delay': '50ms', '--enter-start': '100ms' }}
      >
        {groups.map((group) => (
          <Fragment key={group.year}>
            <li className="my-5 text-right text-3xl font-extrabold first:mt-0 max-md:text-2xl">
              {group.year}
            </li>
            {group.list.map((article) => (
              <li key={article.slug}>
                <Link
                  className="flex gap-6 max-sm:flex-col max-sm:gap-0"
                  href={article.url}
                >
                  <span className="shrink-0 max-md:text-sm">
                    <DateTime
                      dateString={article.date}
                      dateFormat="MMM DD"
                      className="text-subtle inline-block w-16 shrink-0"
                    />
                    {extractInfo && renderExtraInfo(extractInfo(article))}
                  </span>
                  <span className="link-hover text-text truncate max-sm:whitespace-normal">
                    {renderTitle ? renderTitle(article) : article.title}
                  </span>
                </Link>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
    </PageLayout>
  )
}
