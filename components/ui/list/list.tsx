import Link from 'next/link'
import { type ReactNode } from 'react'
import { Date } from '@/components/ui/date'
import {
  StaggeredFadeInContainer,
  StaggeredFadeInItem,
} from '@/components/ui/stagger'
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
    <StaggeredFadeInContainer as="main" className="page">
      <StaggeredFadeInItem as="header">
        <h1 className="text-4xl font-extrabold">{title}</h1>
      </StaggeredFadeInItem>
      <div className="space-y-2">
        {groups.map((group) => (
          <StaggeredFadeInItem key={group.year}>
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
          </StaggeredFadeInItem>
        ))}
      </div>
    </StaggeredFadeInContainer>
  )
}
