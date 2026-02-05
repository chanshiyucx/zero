import { sortedSnippets } from '@/lib/utils/content'

export function generateStaticParams() {
  return sortedSnippets.map((snippet) => ({
    slug: snippet.slug,
  }))
}

export { default, generateMetadata } from '@/components/article'
