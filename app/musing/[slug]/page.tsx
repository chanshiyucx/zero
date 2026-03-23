import Article, { generateMetadata } from '@/components/article'
import { sortedMusings } from '@/lib/utils/content'

export function generateStaticParams() {
  return sortedMusings.map((musing) => ({
    slug: musing.slug,
  }))
}

export { generateMetadata }

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return <Article params={params} contentClassName="musing" />
}
