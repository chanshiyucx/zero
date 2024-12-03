import { allLeetcodes } from 'content-collections'
import { notFound } from 'next/navigation'
import { Date } from '@/components/ui/date'
import { MDX } from '@/components/ui/mdx'

type Params = {
  slug: string
}

export const generateStaticParams = () =>
  allLeetcodes.map((leetcode) => ({ slug: leetcode.slug }))

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { slug } = await params
  const leetcode = allLeetcodes.find((leetcode) => leetcode.slug === slug)
  return {
    title: `${leetcode?.title} - Reverie`,
    keywords: leetcode?.tags.join(','),
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const leetcode = allLeetcodes.find((leetcode) => leetcode.slug === slug)

  if (!leetcode) {
    return notFound()
  }

  return (
    <article className="page">
      <header className="mb-6">
        <h1 className="mb-2 text-2xl font-extrabold">{leetcode.title}</h1>
        <div className="mt-3 flex gap-2 space-x-2 text-subtle">
          <Date dateString={leetcode.date} />
          <span>
            {leetcode.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </div>
      </header>
      <section className="py-5">
        <MDX code={leetcode.contentCode} />
      </section>
    </article>
  )
}
