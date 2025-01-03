import type { Content } from '@/lib/utils/content'
import type { Metadata } from 'next'
import { CalendarBlank, Tag } from '@phosphor-icons/react/dist/ssr'
import { notFound } from 'next/navigation'
import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'
import { config } from '@/lib/constants/config'

interface ArticleProps {
  params: Promise<{ slug: string }>
  collection: Content[]
}

export async function generateArticleMetadata({
  params,
  collection,
}: ArticleProps): Promise<Metadata> {
  const { slug } = await params
  const article = collection.find((item) => item.slug === slug)
  if (!article) return {}
  const publisher = `${config.author.name} ${config.author.link}`

  return {
    ...config.metadata,
    keywords: article.tags,
    publisher: publisher,
    openGraph: {
      ...config.metadata,
      tags: article.tags,
      authors: publisher,
      type: 'article',
      url: article.url,
    },
    twitter: {
      ...config.metadata,
      card: 'summary_large_image',
      creator: publisher,
    },
  }
}

export async function Article({ params, collection }: ArticleProps) {
  const { slug } = await params
  const article = collection.find((item) => item.slug === slug)

  if (!article) {
    return notFound()
  }

  return (
    <article className="page space-y-12">
      <header>
        <h1 className="text-3xl font-extrabold">{article.title}</h1>
        <div className="mt-3 flex gap-5 text-subtle">
          <span className="inline-flex items-center gap-1">
            <CalendarBlank weight="bold" />
            <Date dateString={article.date} dateFormat="LLL dd, yyyy" />
          </span>
          <span className="flex gap-3">
            {article.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1">
                <Tag weight="bold" />
                {tag}
              </span>
            ))}
          </span>
        </div>
      </header>
      <section>
        <MDX code={article.contentCode} />
      </section>
    </article>
  )
}
