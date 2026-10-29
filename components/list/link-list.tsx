import { DateTime } from '@/components/datetime'
import { PageLayout } from '@/components/page'
import type { ContentGroup } from '@/lib/utils/content'
import { ArticleTitleTransitionLink } from './article-title-transition-link'

type LinkListProps = {
  title: string
  groups: ContentGroup[]
}

export function LinkList({ title, groups }: LinkListProps) {
  return (
    <PageLayout title={title}>
      <div data-slide-auto className="w-full space-y-5">
        {groups.map((group) => (
          <section key={group.year}>
            <h2 className="mb-5 text-right text-2xl font-extrabold">
              {group.year}
            </h2>
            <ul className="space-y-2 max-md:space-y-4">
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
                  <ArticleTitleTransitionLink
                    href={article.url}
                    slug={article.slug}
                    className="link link-hover text-text truncate max-sm:whitespace-normal"
                  >
                    {article.title}
                  </ArticleTitleTransitionLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageLayout>
  )
}
