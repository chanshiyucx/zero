import { DotIcon } from '@phosphor-icons/react/dist/ssr'
import { type Metadata } from 'next'
import { type ComponentPropsWithoutRef } from 'react'
import { PageLayout } from '@/components/layout/page'
import { DateTime } from '@/components/ui/datetime'
import { MDX, type MDXComponents } from '@/components/ui/mdx'
import { sortedVibes } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Vibes',
  description: 'A collection of moments when the soul decides to speak.',
  keywords: ['blog', 'vibes', 'thoughts', 'feelings', 'moods', 'musings'],
}

export function Link(props: ComponentPropsWithoutRef<'a'>) {
  const linkText = props.children as string
  const [date, local] = linkText.split(' ')
  return (
    <a
      className="link text-subtle! flex items-center text-sm font-medium! before:hidden"
      {...props}
    >
      <DateTime dateString={date} />
      <DotIcon size={24} />
      <span>{local}</span>
    </a>
  )
}

const customComponents: MDXComponents = {
  a: Link,
}

export default function Page() {
  const vibeList = sortedVibes

  return (
    <PageLayout title="Time flows like gentle rivers.">
      <div className="vibes space-y-12">
        {vibeList.map((vibe) => (
          <MDX
            key={vibe.title}
            staggerStart={100}
            contentCode={vibe.contentCode}
            components={customComponents}
          />
        ))}
      </div>
    </PageLayout>
  )
}
