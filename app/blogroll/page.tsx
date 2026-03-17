import type { Metadata } from 'next'
import { PageLayout } from '@/components/page'
import { siteConfig } from '@/lib/constants/config'

const { blogroll } = siteConfig

export const metadata: Metadata = {
  title: 'Blogroll',
  description: 'A collection of blogs and websites that inspire me.',
  keywords: ['blogroll', 'blogs', 'links', 'inspiration'],
}

export default function Page() {
  return (
    <PageLayout title="No man is an island.">
      <div data-slide-auto className="prose prose-rosepine space-y-12">
        <p>
          This page is frequently updated. Only websites that are being actively
          updated and genuinely interesting are included.
        </p>

        <hr className="mt-0 mb-0" />

        {blogroll.map((blog) => (
          <div key={blog.title}>
            <h4>
              <a
                className="link"
                target="_blank"
                rel="noopener noreferrer"
                href={blog.url}
                aria-label={blog.title}
              >
                {blog.title}
              </a>
            </h4>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
