import { allPosts } from 'contentlayer/generated'
// import { format } from 'date-fns'
// import { Bookmark, Calendar, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'

// import MDX from '@/components/MDX'

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.title }))

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const post = allPosts.find(
    (post) => post.title === decodeURIComponent(params.slug),
  )
  return {
    title: `${post?.title} - 蝉時雨`,
    description: post?.description,
    keywords: post?.tags.join(','),
  }
}

export default function PostLayout({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    (post) => post.title === decodeURIComponent(params.slug),
  )
  if (!post) {
    return notFound()
  }

  return (
    <div className="page">
      <article>66666</article>
    </div>
  )
}
