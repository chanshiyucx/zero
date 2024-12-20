import type { Metadata } from 'next'
import { allPosts } from 'content-collections'
import { Article, generateArticleMetadata } from '@/components/ui/article'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return generateArticleMetadata({ params, collection: allPosts })
}

export default async function Page(props: PageProps) {
  return Article({
    ...props,
    collection: allPosts,
  })
}
