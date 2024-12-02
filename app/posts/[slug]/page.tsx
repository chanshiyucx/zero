import { allPosts } from 'content-collections'
import { notFound } from 'next/navigation'
import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'

type Params = {
  slug: string
}

export const generateStaticParams = () =>
  allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({ params }: { params: Params }) => {
  const post = allPosts.find((post) => post.slug === params.slug)
  return {
    title: `${post?.title} - Reverie`,
    description: post?.description,
    keywords: post?.tags.join(','),
  }
}

export default async function PostLayout({ params }: { params: Params }) {
  const { slug } = await params
  const post = allPosts.find((post) => post.slug === slug)

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
