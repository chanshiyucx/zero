import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allLeetcodes } from '@/.content-collections/generated'
import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'
import { config } from '@/lib/config'
import { sortedLeetcodes } from '@/lib/content'

interface PageProps {
  params: { slug: string }
}

export function generateMetadata({ params }: PageProps): Metadata {
  const leetcode = allLeetcodes.find(
    (leetcode) => leetcode.slug === params.slug,
  )
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
    <article className="page">
      <header className="mb-6">
        <h1 className="mb-2 text-2xl font-extrabold">{leetcode.title}</h1>
        <div className="mt-3 flex gap-2 space-x-2 text-subtle">
          <Date dateString={leetcode.date} />
          <span>
            {leetcode.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </div>
      </header>
      <section className="py-5">
        <MDX code={leetcode.contentCode} />
      </section>
    </article>
  )
}
