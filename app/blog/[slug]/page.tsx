import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import MDX from '@/components/MDX'

type Params = {
  slug: string
}

export const generateStaticParams = async () => {
  const rr = allBlogs.map((blog) => ({ slug: blog.slug }))
  console.log('rr', rr)
  return rr
}

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
      <h1 className=" text-2xl font-extrabold md:text-4xl">{blog.title}</h1>
      <div className="mb-3 mt-6 text-justify">
        <MDX code={blog.body.code} />
      </div>
    </article>
  )
}
