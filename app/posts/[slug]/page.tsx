import { allPosts } from 'contentlayer/generated'
import { format } from 'date-fns'
import { Bookmark, Calendar, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'
import Comment from '@/components/Comment'
import MDX from '@/components/MDX'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.title }))

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.title === decodeURIComponent(params.slug))
  return {
    title: `${post?.title} - 蝉時雨`,
    description: post?.description,
    keywords: post?.tags.join(','),
  }
}

export default function PostLayout({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.title === decodeURIComponent(params.slug))
  if (!post) {
    return notFound()
  }

  return (
    <div className="page">
      <article>
        <h2 className="mb-6 text-4xl italic">{post.title}</h2>
        <div className="meta mb-12 flex justify-start">
          <Calendar className="mr-1" />
          {format(new Date(post.date), 'yyyy-MM-dd')}
          <Bookmark className="ml-4 mr-1" />
          {post.category}
          <Tag className="ml-4 mr-1" />
          {post.tags.map((tag) => (
            <span key={tag} className="mr-2">
              {tag.trim()}
            </span>
          ))}
        </div>
        <MDX code={post.body.code} />
      </article>
      <Comment term={post.title} />
    </div>
  )
}
