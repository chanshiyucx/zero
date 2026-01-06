import type { Snippet } from 'content-collections'
import type { Metadata } from 'next'
import Link from 'next/link'
import { DateTime } from '@/components/datetime'
import { MDX } from '@/components/mdx'
import { PageLayout } from '@/components/page'
import { sortedSnippets } from '@/lib/utils/content'
import { cn } from '@/lib/utils/style'

export const metadata: Metadata = {
  title: 'Snippets',
  description: 'A collection of snippets on things I have learned recently.',
  keywords: ['blog', 'snippets', 'learn', 'study', 'skills', 'code'],
}

function SnippetItem({
  snippet,
  isFirst,
}: {
  snippet: Snippet
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
        <Link className="link link-hover text-2xl font-bold" href={snippet.url}>
          <h2 id={snippet.slug}>{snippet.title}</h2>
        </Link>
        <div className="text-subtle flex shrink-0 text-sm">
          <DateTime dateString={snippet.date} />
        </div>
      </header>
      <MDX contentCode={snippet.descriptionCode} />
    </article>
  )
}

export default function Page() {
  return (
    <PageLayout title="Snippets are memory anchors.">
      <div className="space-y-12">
        {sortedSnippets.map((snippet, index) => (
          <SnippetItem
            key={snippet.slug}
            snippet={snippet}
            isFirst={index === 0}
          />
        ))}
      </div>
    </PageLayout>
  )
}
