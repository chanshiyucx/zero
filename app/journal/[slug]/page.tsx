import { sortedJournals } from '@/lib/utils/content'

export function generateStaticParams() {
  return sortedJournals.map((journal) => ({
    slug: journal.slug,
  }))
}

export { default, generateMetadata } from '@/components/article'
