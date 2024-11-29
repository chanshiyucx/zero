import { allPosts } from 'content-collections'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { MDX } from '@/components/ui/mdx'

type Params = {
  slug: string
}

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = async ({ params }: { params: Params }) => {
  const post = allPosts.find((post) => post.slug === params.slug)
  return {
    title: `${post?.title} - Reverie`,
    description: post?.description,
    keywords: post?.tags.join(','),
  }
}

export default function PostLayout({ params }: { params: Params }) {
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return notFound()
  }

  return (
    <article className="p-2 md:px-16 md:py-4">
      <header className="mb-6">
        <h1 className="mb-2 text-2xl font-extrabold md:-ml-8 md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-3 flex gap-2 space-x-2 text-zinc-400">
          <span>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
          <span>/</span>
          <span>/</span>
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
