import { allPosts } from 'contentlayer/generated'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import MDX from '@/components/MDX'

type Params = {
  slug: string
}

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = async ({ params }: { params: Params }) => {
  const post = allPosts.find((post) => post.slug === params.slug)
  return {
    title: `${post?.title} - 蝉時雨`,
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
    <article>
      <header className="px-2">
        <h1 className="text-2xl font-extrabold md:text-4xl">{post.title}</h1>
        <div className="my-3 flex gap-2 px-2 text-lg">
          <span> {format(new Date(post.date), 'yyyy-MM-dd')}</span>
          <span>·</span>
          <span>{post.category}</span>
        </div>
      </header>
      <section className="px-2 py-5 md:px-16">
        <MDX code={post.body.code} />
      </section>
    </article>
  )
}
