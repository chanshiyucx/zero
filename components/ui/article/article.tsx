import { DotIcon } from '@phosphor-icons/react/dist/ssr'
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

const calculateMediumReadingTime = (content: string): string => {
  if (!content || content.trim() === '') {
    return '1 min read'
  }

  const wordsPerMinute = 200
  const wordMatches = content.match(/\S+/g)
  const wordCount = wordMatches ? wordMatches.length : 0

  const textReadTime = wordCount / wordsPerMinute
  const totalReadTimeInMinutes = textReadTime

  const roundedMinutes = Math.ceil(totalReadTimeInMinutes)
  const finalMinutes = Math.max(1, roundedMinutes)

  return `${finalMinutes} min read`
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
    <main className="page slide-container space-y-12">
      <article className="space-y-12">
        <header>
          <h1
            style={{ '--enter-stagger': stagger++ }}
            className="text-3xl font-extrabold"
          >
            {article.title}
          </h1>
          <div
            style={{ '--enter-stagger': stagger++ }}
            className="text-subtle mt-3 flex items-center text-sm"
          >
            <DateTime dateString={article.date} />
            <DotIcon size={24} />
            <span>{calculateMediumReadingTime(article.content)}</span>
          </div>
        </header>
        <div className="flex flex-row">
          <MDX staggerStart={stagger * 150} contentCode={article.contentCode} />
          {article.toc.length > 0 && (
            <Toc stagger={stagger++} toc={article.toc} />
          )}
        </div>
      </article>
      <div style={{ '--enter-stagger': stagger++ }} className="space-y-2">
        {!hideDiscussion && (
          <Discussion label={article.type} title={article.title} />
        )}
        <Backward />
      </div>
    </main>
  )
}
