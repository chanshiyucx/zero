import { sortedArticles } from '@/lib/utils/content'

export function generateStaticParams() {
  return sortedArticles.map((article) => ({
    slug: article.slug,
  }))
}

export { default, generateMetadata } from '@/components/article'
