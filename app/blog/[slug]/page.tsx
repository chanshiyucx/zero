import { allBlogs } from 'contentlayer/generated'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import MDX from '@/components/MDX'

type Params = {
  slug: string
}

export const generateStaticParams = async () =>
  allBlogs.map((blog) => ({ slug: blog.slug }))

export const generateMetadata = async ({ params }: { params: Params }) => {
  const blog = allBlogs.find((blog) => blog.slug === params.slug)
  return {
    title: `${blog?.title} - 蝉時雨`,
    description: blog?.description,
    keywords: blog?.tags.join(','),
  }
}

export default function PostLayout({ params }: { params: Params }) {
  const blog = allBlogs.find((blog) => blog.slug === params.slug)

  if (!blog) {
    return notFound()
  }

  return (
    <article>
      <header className="px-2">
        <h1 className="text-2xl font-extrabold md:text-5xl">{blog.title}</h1>
        <div className="my-3 flex gap-2 px-2 text-lg">
          <span> {format(new Date(blog.date), 'yyyy-MM-dd')}</span>
          <span>·</span>
          <span>{blog.category}</span>
        </div>
      </header>
      <section className="px-2 py-5 md:px-16">
        <MDX code={blog.body.code} />
      </section>
    </article>
  )
}
