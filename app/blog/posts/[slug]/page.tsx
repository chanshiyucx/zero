import type { Metadata } from 'next'
import { allPosts } from 'content-collections'
import { notFound } from 'next/navigation'
import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'
import { config } from '@/lib/config'
import { sortedPosts } from '@/lib/content'

interface PageProps {
  params: { slug: string }
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = allPosts.find((post) => post.slug === params.slug)
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
    <article className="page">
      <header className="mb-6">
        <h1 className="mb-2 text-2xl font-extrabold">{post.title}</h1>
        <div className="mt-3 flex gap-2 space-x-2 text-subtle">
          <Date dateString={post.date} />
          <span>
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </div>
      </header>
      <section className="py-5">
        <MDX code={post.contentCode} />
      </section>
    </article>
  )
}
