import { sortedMusings } from '@/lib/utils/content'

export function generateStaticParams() {
  return sortedMusings.map((musing) => ({
    slug: musing.slug,
  }))
}

export { default, generateMetadata } from '@/components/article'
