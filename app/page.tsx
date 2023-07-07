import { allPosts, Post } from 'contentlayer/generated'
import MDX from '@/components/MDX'

export default function Home() {
  const posts: Post[] = allPosts.sort((a, b) => b.no - a.no)

  return (
    <div className="max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">Home Page</h1>
      {posts.map((post) => (
        <MDX key={post._id} code={post.description.code} />
      ))}
    </div>
  )
}
