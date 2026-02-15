import { sortedCrafts } from '@/lib/utils/content'

export function generateStaticParams() {
  return sortedCrafts.map((craft) => ({
    slug: craft.slug,
  }))
}

export { default, generateMetadata } from '@/components/article'
