import type { Metadata } from 'next'
import { allClippings } from 'content-collections'
import { Article, generateArticleMetadata } from '@/components/ui/article'

interface PageProps {
  params: Promise<{ slug: string }>
}

const pageData = {
  type: 'Clipping',
  collection: allClippings,
} as const

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return generateArticleMetadata({ params, ...pageData })
}

export default async function Page(props: PageProps) {
  return Article({
    ...props,
    ...pageData,
  })
}
