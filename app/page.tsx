import { allPosts, Post } from 'contentlayer/generated'
import MDX from '@/components/MDX'

export default function Home() {
  const posts: Post[] = allPosts.sort((a, b) => b.no - a.no)

  const post: Post = posts[0]
  // const list = posts.map((e) => ({ ...e, body: '' }))
  // console.log('list-----', list)
  return (
    <div className="mx-auto max-w-xl py-8 ">
      <h1 className="mb-8 text-center text-2xl font-black">Home Page</h1>
      <MDX code={post.body.code} />
      {/* {posts.map((post, idx) => (
        <MDX key={idx} code={post.body.code} />
      ))} */}
    </div>
  )
}
