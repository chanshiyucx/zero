import type { Leetcode, Post } from 'content-collections'
import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'

interface ArticleProps {
  article: Leetcode | Post
}

export function Article({ article }: ArticleProps) {
  return (
    <article>
      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-extrabold">{article.title}</h1>
        <div className="mt-3 flex gap-2 space-x-2 text-subtle">
          <Date dateString={article.date} />
          <span>
            {article.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </div>
      </header>
      <section className="py-5">
        <MDX code={article.contentCode} />
      </section>
    </article>
  )
}
