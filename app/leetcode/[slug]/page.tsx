import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allLeetcodes } from '@/.content-collections/generated'
import { Article } from '@/components/ui/article'
import { config } from '@/lib/config'
import { sortedLeetcodes } from '@/lib/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const leetcode = allLeetcodes.find((leetcode) => leetcode.slug === slug)
  if (!leetcode) return {}
  const publisher = `${config.author.name} ${config.author.link}`

  return {
    ...config.metadata,
    keywords: leetcode.tags,
    publisher: publisher,
    openGraph: {
      ...config.metadata,
      tags: leetcode.tags,
      authors: publisher,
      type: 'article',
      url: leetcode.url,
    },
    twitter: {
      ...config.metadata,
      card: 'summary_large_image',
      creator: publisher,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const leetcodeList = sortedLeetcodes()
  const leetcode = leetcodeList.find((leetcode) => leetcode.slug === slug)

  if (!leetcode) {
    return notFound()
  }

  return (
    <div className="page">
      <Article article={leetcode} />
    </div>
  )
}
