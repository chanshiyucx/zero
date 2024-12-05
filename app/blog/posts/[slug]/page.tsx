import { notFound } from 'next/navigation'
import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'
import { sortedPosts } from '@/lib/content'

type Params = Promise<{ slug: string }>

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const postList = sortedPosts()
  const post = postList.find((post) => post.slug === slug)

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
