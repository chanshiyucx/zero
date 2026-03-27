import Link from 'next/link'
import { DateTime } from '@/components/datetime'
import { Discussion } from '@/components/discussion'
import { MDX } from '@/components/mdx'
import { PageLayout } from '@/components/page'
import type { Content } from '@/lib/utils/content'
import { cn } from '@/lib/utils/style'

function ContentItem({
  content,
  isFirst,
  contentClassName,
  enableLink,
}: {
  content: Content
  isFirst: boolean
  contentClassName?: string
  enableLink: boolean
}) {
  return (
    <article>
      <header
        className={cn(
          'border-overlay mb-6 flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1',
          isFirst ? 'border-t-0 pt-0' : 'border-t pt-12',
        )}
      >
        {enableLink ? (
          <Link
            className="link link-hover text-lg font-bold"
            href={content.url}
          >
            {content.title}
          </Link>
        ) : (
          <h2 className="text-lg font-bold">{content.title}</h2>
        )}
        <div className="flex gap-3">
          <Discussion label={content.type} title={content.title} simple />
          <DateTime
            dateString={content.date}
            className="text-subtle shrink-0 text-sm"
          />
        </div>
      </header>
      <MDX className={contentClassName} contentCode={content.contentCode} />
    </article>
  )
}

type ArticleListProps = {
  title: string
  data: Content[]
  contentClassName?: string
  enableLink?: boolean
}

export function ArticleList({
  title,
  data,
  contentClassName,
  enableLink = true,
}: ArticleListProps) {
  return (
    <PageLayout title={title}>
      <div data-slide-auto data-slide-start="1" className="space-y-12">
        {data.map((content, index) => (
          <ContentItem
            key={content.slug}
            content={content}
            isFirst={index === 0}
            contentClassName={contentClassName}
            enableLink={enableLink}
          />
        ))}
      </div>
    </PageLayout>
  )
}
