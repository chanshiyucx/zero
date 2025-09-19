import { type Snippet } from 'content-collections'
import { type Metadata } from 'next'
import Link from 'next/link'
import { PageLayout } from '@/components/layout/page'
import { DateTime } from '@/components/ui/datetime'
import { MDX } from '@/components/ui/mdx'
import { sortedSnippets } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Snippets',
  description: 'A collection of snippets on things I have learned recently.',
  keywords: ['blog', 'snippets', 'learn', 'study', 'skills', 'code'],
}

function SnippetItem({ snippet }: { snippet: Snippet }) {
  return (
    <article className="border-overlay border-b pb-12 last:border-b-0 last:pb-0">
      <header
        style={{ '--enter-stagger': 1 }}
        className="mb-6 flex flex-row items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-1"
      >
        <Link className="link text-2xl font-bold" href={snippet.url}>
          <h2 id={snippet.slug}>{snippet.title}</h2>
        </Link>
        <div className="text-subtle flex shrink-0 text-sm">
          <DateTime dateString={snippet.date} />
        </div>
      </header>
      <MDX staggerStart={2 * 100} contentCode={snippet.descriptionCode} />
    </article>
  )
}

export default function Page() {
  return (
    <PageLayout title="Snippets are memory anchors.">
      <div className="space-y-12">
        {sortedSnippets.map((snippet) => (
          <SnippetItem key={snippet.slug} snippet={snippet} />
        ))}
      </div>
    </PageLayout>
  )
}
