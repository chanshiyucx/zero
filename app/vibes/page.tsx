import { CalendarBlankIcon, MapPinIcon } from '@phosphor-icons/react/dist/ssr'
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
      className="link text-subtle! text-normal flex items-center font-medium! before:hidden"
      {...props}
    >
      <CalendarBlankIcon weight="bold" className="mr-0.5" />
      <DateTime dateString={date} />
      <MapPinIcon weight="bold" className="mr-0.5 ml-3" />
      {local}
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
      <section className="vibes space-y-12">
        {vibeList.map((vibe) => (
          <MDX
            key={vibe.title}
            staggerStart={100}
            contentCode={vibe.contentCode}
            components={customComponents}
          />
        ))}
      </section>
    </PageLayout>
  )
}
