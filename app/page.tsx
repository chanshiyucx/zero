import { allPosts, Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import MDX from '@/components/MDX'

export default function Home() {
  const posts: Post[] = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  return (
    <div className="mx-auto max-w-xl py-8 ">
      <h1 className="mb-8 text-center text-2xl font-black">Home Page</h1>
      {posts.map((post, idx) => (
        <MDX key={idx} code={post.body.code} />
      ))}
    </div>
  )
}
