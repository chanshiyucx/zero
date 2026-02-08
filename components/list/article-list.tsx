import Link from 'next/link'
import { DateTime } from '@/components/datetime'
import { MDX } from '@/components/mdx'
import { PageLayout } from '@/components/page'
import type { Content } from '@/lib/utils/content'
import { cn } from '@/lib/utils/style'

type CodeKey = 'contentCode' | 'descriptionCode'

function ContentItem({
  codeKey,
  content,
  isFirst,
}: {
  codeKey: CodeKey
  content: Content
  isFirst: boolean
}) {
  return (
    <article>
      <header
        data-slide
        className={cn(
          'border-overlay mb-6 flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1',
          isFirst ? 'border-t-0 pt-0' : 'border-t pt-12',
        )}
      >
        <Link className="link link-hover text-2xl font-bold" href={content.url}>
          <h2 id={content.slug}>{content.title}</h2>
        </Link>
        <div className="text-subtle flex shrink-0 text-sm">
          <DateTime dateString={content.date} />
        </div>
      </header>
      <MDX contentCode={content[codeKey]} />
    </article>
  )
}

interface ArticleListProps {
  title: string
  codeKey: CodeKey
  data: Content[]
}

export function ArticleList({ title, data, codeKey }: ArticleListProps) {
  return (
    <PageLayout title={title}>
      <div className="space-y-12">
        {data.map((content, index) => (
          <ContentItem
            key={content.slug}
            content={content}
            codeKey={codeKey}
            isFirst={index === 0}
          />
        ))}
      </div>
    </PageLayout>
  )
}
