import type { Post } from 'contentlayer/generated'
import { allPosts } from 'contentlayer/generated'
import Comment from '@/components/Comment'
import MDX from '@/components/MDX'

export default function AboutLayout() {
  const post: Post = allPosts.filter((post) => post.category === '真我之名')[0]

  return (
    <div className="page prose max-w-full">
      <article>
        <MDX code={post.body.code} />
      </article>
      <Comment term="关于" />
    </div>
  )
}
