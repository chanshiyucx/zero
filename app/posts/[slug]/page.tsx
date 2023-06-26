// import { allPosts } from 'contentlayer/generated'
// import { format, parseISO } from 'date-fns'

// export const generateStaticParams = () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

// export const generateMetadata = ({ params }: { params: { slug: string } }) => {
//   const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
//   if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
//   return { title: post.title }
// }

const PostLayout = () => {
  // const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  // if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <article className="prose mx-auto max-w-xl py-8 lg:prose-xl">
      <div className="mb-8 text-center">test!!!!!!!!</div>
    </article>
  )
}

export default PostLayout
