import { allNotes } from 'content-collections'
import { type Metadata } from 'next'
import { Article, generateArticleMetadata } from '@/components/ui/article'

interface PageProps {
  params: Promise<{ slug: string }>
}

const pageData = {
  type: 'Note',
  collection: allNotes,
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
