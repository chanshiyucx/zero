import type { Metadata } from 'next'
import { allLeetcodes } from '@/.content-collections/generated'
import { Article, generateArticleMetadata } from '@/components/ui/article'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return generateArticleMetadata({ params, collection: allLeetcodes })
}

export default async function Page(props: PageProps) {
  return Article({
    ...props,
    collection: allLeetcodes,
  })
}
