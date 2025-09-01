import { CalendarBlankIcon, TagIcon } from '@phosphor-icons/react/dist/ssr'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Backward } from '@/components/ui/backward'
import { DateTime } from '@/components/ui/datetime'
import { Discussion } from '@/components/ui/discussion'
import { MDX } from '@/components/ui/mdx'
import { Toc } from '@/components/ui/toc'
import { siteConfig } from '@/lib/constants/config'
import { findContentBySlug } from '@/lib/utils/content'

interface ArticleProps {
  params: Promise<{ slug: string }>
  hideDiscussion?: boolean
}

export async function generateMetadata({
  params,
}: ArticleProps): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const article = findContentBySlug(decodedSlug)
  if (!article) return {}
  const publisher = `${siteConfig.author.name} ${siteConfig.author.link}`

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    publisher: publisher,
    openGraph: {
      title: article.title,
      description: article.description,
      tags: article.tags,
      authors: publisher,
      type: 'article',
      url: article.url,
      images: [
        {
          url: `/og/${slug}`,
          width: 1200,
          height: 630,
          alt: siteConfig.metadata.title,
        },
      ],
    },
    twitter: {
      title: article.title,
      description: article.description,
      card: 'summary_large_image',
      creator: publisher,
      images: [`/og/${slug}`],
    },
  }
}

export async function Article({
  params,
  hideDiscussion = false,
}: ArticleProps) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const article = findContentBySlug(decodedSlug)
  let stagger = 0

  if (!article) {
    return notFound()
  }

  return (
    <main className="page slide-container">
      <article className="mb-0 w-full space-y-12">
        <header>
          <h1
            style={{ '--stagger': stagger++ }}
            className="text-4xl font-extrabold max-md:text-3xl"
          >
            {article.title}
          </h1>
          <div
            style={{ '--stagger': stagger++ }}
            className="text-subtle mt-3 flex gap-5"
          >
            <span className="inline-flex shrink-0 items-center gap-1">
              <CalendarBlankIcon weight="bold" />
              <DateTime dateString={article.date} dateFormat="LLL dd, yyyy" />
            </span>
            <span className="inline-flex items-center gap-1">
              <TagIcon weight="bold" />
              {article.tags.at(-1)}
            </span>
          </div>
        </header>
        <section className="flex flex-row">
          <MDX staggerStart={stagger * 100} contentCode={article.contentCode} />
          {article.toc.length > 0 && <Toc toc={article.toc} />}
        </section>
        <footer
          style={{ '--stagger': stagger++ }}
          className="flex flex-col gap-2"
        >
          {!hideDiscussion && (
            <Discussion label={article.type} title={article.title} />
          )}
          <Backward />
        </footer>
      </article>
    </main>
  )
}
