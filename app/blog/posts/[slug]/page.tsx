import type { Metadata } from 'next'
import { allPosts } from 'content-collections'
import { notFound } from 'next/navigation'
import { Article } from '@/components/ui/article'
import { config } from '@/lib/config'
import { sortedPosts } from '@/lib/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find((post) => post.slug === slug)
  if (!post) return {}
  const publisher = `${config.author.name} ${config.author.link}`

  return {
    ...config.metadata,
    keywords: post.tags,
    publisher: publisher,
    openGraph: {
      ...config.metadata,
      tags: post.tags,
      authors: publisher,
      type: 'article',
      url: post.url,
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
  const postList = sortedPosts()
  const post = postList.find((post) => post.slug === slug)

  if (!post) {
    return notFound()
  }

  return (
    <div className="page">
      <Article article={post} />
    </div>
  )
}
