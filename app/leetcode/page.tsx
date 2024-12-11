import type { Metadata } from 'next'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { MonoWord } from '@/components/ui/mono-word'
import { sortedLeetcodes } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Leetcode',
  description:
    'A collection of my LeetCode solutions with explanations and optimizations, showcasing my approach to coding challenges.',
  keywords: ['leetcode', 'code', 'programming'],
}

export default function Page() {
  const leetcodeList = sortedLeetcodes()

  return (
    <article className="page">
      <header>
        <h1 className="text-4xl font-extrabold">
          Simplicity is the soul of efficiency.
        </h1>
      </header>
      <ul className="space-y-2">
        {leetcodeList.map((leetcode) => (
          <li key={leetcode.title}>
            <Link className="flex gap-6" href={leetcode.url}>
              <Date
                dateString={leetcode.date}
                className="w-16 shrink-0 text-subtle"
              ></Date>
              <span className="overflow-x-hidden text-ellipsis whitespace-nowrap">
                <MonoWord
                  label={leetcode.id}
                  mode="letter"
                  className="mr-1 w-10"
                />
                - {leetcode.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
