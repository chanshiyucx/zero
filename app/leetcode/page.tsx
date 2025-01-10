import type { Metadata } from 'next'
import clsx from 'clsx'
import Link from 'next/link'
import { Date } from '@/components/ui/date'
import { sortedLeetcodes } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Leetcode',
  description:
    'A collection of my LeetCode solutions with explanations and optimizations, showcasing my approach to coding challenges.',
  keywords: ['leetcode', 'code', 'programming'],
}

const colors = {
  Easy: 'text-foam',
  Medium: 'text-gold',
  Hard: 'text-love',
}

export default function Page() {
  const leetcodeList = sortedLeetcodes()

  return (
    <main className="page">
      <header>
        <h1 className="text-4xl font-extrabold">
          Simplicity fuels ultimate efficiency.
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
              <span className={clsx('w-16 text-sm', colors[leetcode.level!])}>
                {leetcode.level}
              </span>
              <span className="link-hover overflow-x-hidden text-ellipsis whitespace-nowrap text-text">
                {leetcode.id} - {leetcode.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
