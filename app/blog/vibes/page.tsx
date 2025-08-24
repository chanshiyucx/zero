import { CalendarBlankIcon, MapPinIcon } from '@phosphor-icons/react/dist/ssr'
import { type Metadata } from 'next'
import { type AnchorHTMLAttributes, type DetailedHTMLProps } from 'react'
import { DateTime } from '@/components/ui/datetime'
import { MDX } from '@/components/ui/mdx'
import {
  StaggeredFadeInContainer,
  StaggeredFadeInItem,
} from '@/components/ui/stagger'
import { sortedVibes } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Vibes',
  description: 'A collection of moments when the soul decides to speak.',
  keywords: ['blog', 'vibes', 'thoughts', 'feelings', 'moods', 'musings'],
}

export function Link(
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) {
  const linkText = props.children as string
  const [date, local] = linkText.split(' ')
  return (
    <a className="link text-subtle! flex items-center" {...props}>
      <CalendarBlankIcon weight="bold" className="mr-0.5" />
      <DateTime dateString={date} dateFormat="LLL dd, yyyy" />
      <MapPinIcon weight="bold" className="mr-0.5 ml-3" />
      {local}
    </a>
  )
}

export default function Page() {
  const vibeList = sortedVibes

  return (
    <StaggeredFadeInContainer as="main" className="page">
      <StaggeredFadeInItem as="header">
        <h1 className="text-4xl font-extrabold max-md:text-3xl">
          Time flows like gentle rivers.
        </h1>
      </StaggeredFadeInItem>
      <section className="vibes space-y-8">
        {vibeList.map((vibe) => (
          <StaggeredFadeInItem key={vibe.title}>
            <MDX contentCode={vibe.contentCode} components={{ a: Link }} />
          </StaggeredFadeInItem>
        ))}
      </section>
    </StaggeredFadeInContainer>
  )
}
