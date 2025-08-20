import { CalendarBlankIcon, TagIcon } from '@phosphor-icons/react/dist/ssr'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Backward } from '@/components/ui/backward'
import { Date } from '@/components/ui/date'
import { Discussion } from '@/components/ui/discussion'
import { MDX } from '@/components/ui/mdx'
import {
  StaggeredFadeInContainer,
  StaggeredFadeInItem,
} from '@/components/ui/stagger'
import { Toc } from '@/components/ui/toc'
import { siteConfig } from '@/lib/constants/config'
import { findContentBySlug, type ContentType } from '@/lib/utils/content'
import { Title } from './title'

interface ArticleProps {
  params: Promise<{ slug: string }>
  type: ContentType
  hideDiscussion?: boolean
}

export async function generateArticleMetadata({
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
  type,
  hideDiscussion = false,
}: ArticleProps) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const article = findContentBySlug(decodedSlug)

  if (!article) {
    return notFound()
  }

  return (
    <StaggeredFadeInContainer as="main" className="page flex flex-row">
      <article className="w-full space-y-12">
        <header>
          <Title titleCode={article.titleCode} />
          <StaggeredFadeInItem className="text-subtle mt-3 flex gap-5">
            <span className="inline-flex shrink-0 items-center gap-1">
              <CalendarBlankIcon weight="bold" />
              <Date dateString={article.date} dateFormat="LLL dd, yyyy" />
            </span>
            <span className="inline-flex items-center gap-1">
              <TagIcon weight="bold" />
              {article.tags.at(-1)}
            </span>
          </StaggeredFadeInItem>
        </header>
        <StaggeredFadeInItem as="section">
          <MDX contentCode={article.contentCode} />
        </StaggeredFadeInItem>
        <StaggeredFadeInItem as="footer" className="flex flex-col gap-2">
          {!hideDiscussion && <Discussion label={type} title={article.title} />}
          <Backward />
        </StaggeredFadeInItem>
      </article>
      {article.toc.length > 0 && <Toc toc={article.toc} />}
    </StaggeredFadeInContainer>
  )
}
