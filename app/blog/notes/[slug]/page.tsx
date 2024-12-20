import type { Metadata } from 'next'
import { allNotes } from 'content-collections'
import { Article, generateArticleMetadata } from '@/components/ui/article'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return generateArticleMetadata({ params, collection: allNotes })
}

export default async function Page(props: PageProps) {
  return Article({
    ...props,
    collection: allNotes,
  })
}
