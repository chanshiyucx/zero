import { allPosts, Post } from 'contentlayer/generated'
import MDX from '@/components/MDX'

export default function Home() {
  const posts: Post[] = allPosts.sort((a, b) => b.no - a.no)

  // const post: Post = posts[0]
  // const list = posts.slice(0, 3)
  // console.log('list-----', list)
  return (
    <div className="mx-auto max-w-xl py-8 ">
      <h1 className="mb-8 text-center text-2xl font-black">Home Page</h1>
      {/* <MDX code={post.description.code} /> */}
      {posts.map((post) => (
        <MDX key={post._id} code={post.description.code} />
      ))}
    </div>
  )
}
