import type { Content, ContentType } from '@/lib/utils/content'
import type { Metadata } from 'next'
import { CalendarBlankIcon, TagIcon } from '@phosphor-icons/react/dist/ssr'
import { notFound } from 'next/navigation'
import { Backward } from '@/components/ui/backward'
import { Date } from '@/components/ui/date'
import { Discussion } from '@/components/ui/discussion'
import { MDX } from '@/components/ui/mdx'
import { Toc } from '@/components/ui/toc'
import { siteConfig } from '@/lib/constants/config'
import { Title } from './title'

interface ArticleProps {
  params: Promise<{ slug: string }>
  collection: Content[]
  type: ContentType
  hideDiscussion?: boolean
}

export async function generateArticleMetadata({
  params,
  collection,
}: ArticleProps): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const article = collection.find((item) => item.slug === decodedSlug)
  if (!article) return {}
  const publisher = `${siteConfig.author.name} ${siteConfig.author.link}`

  return {
    ...siteConfig.metadata,
    keywords: article.tags,
    publisher: publisher,
    openGraph: {
      ...siteConfig.metadata,
      tags: article.tags,
      authors: publisher,
      type: 'article',
      url: article.url,
    },
    twitter: {
      ...siteConfig.metadata,
      card: 'summary_large_image',
      creator: publisher,
    },
  }
}

export async function Article({
  params,
  collection,
  type,
  hideDiscussion = false,
}: ArticleProps) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const article = collection.find((item) => item.slug === decodedSlug)

  if (!article) {
    return notFound()
  }

  console.log('article', article)

  return (
    <main className="page flex flex-row">
      <article className="w-full space-y-12">
        <header>
          <Title titleCode={article.titleCode} />
          <div className="text-subtle mt-3 flex gap-5">
            <span className="inline-flex items-center gap-1">
              <CalendarBlankIcon weight="bold" />
              <Date dateString={article.date} dateFormat="LLL dd, yyyy" />
            </span>
            <span className="flex gap-3">
              {article.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1">
                  <TagIcon weight="bold" />
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </header>
        <section>
          <MDX contentCode={article.contentCode} />
        </section>
        <footer className="flex flex-col gap-2">
          {!hideDiscussion && <Discussion label={type} title={article.title} />}
          <Backward />
        </footer>
      </article>
      {article.toc.length > 0 && <Toc toc={article.toc} />}
    </main>
  )
}
