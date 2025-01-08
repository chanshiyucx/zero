import type { ReactNode } from 'react'
import {
  Notebook,
  Scroll,
  TerminalWindow,
} from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Link from 'next/link'
import { Meow } from '@/components/ui/meow'
import { summary } from '@/lib/utils/content'

type StatProps = {
  icon: ReactNode
  label: string
  value: number
  href: string
  className: string
}

function Stat({ icon, label, value, className, href }: StatProps) {
  return (
    <Link href={href} className={clsx('link-hover inline', className)}>
      <span className="inline-block translate-y-0.5">{icon}</span>
      <span className="mx-1 text-sm">{label}:</span>
      {value}
    </Link>
  )
}

export function AnalysisCard() {
  const { posts, notes, leetcodes } = summary()

  const stats = [
    {
      icon: <Scroll size="1em" weight="duotone" />,
      label: 'Posts',
      value: posts,
      href: '/blog',
      className: 'translate-x-32',
    },
    {
      icon: <Notebook size="1em" weight="duotone" />,
      label: 'Notes',
      value: notes,
      href: '/blog/notes',
      className: 'translate-x-24',
    },
    {
      icon: <TerminalWindow size="1em" weight="duotone" />,
      label: 'Leetcode',
      value: leetcodes,
      href: '/leetcode',
      className: 'translate-x-16',
    },
  ]

  return (
    <div className="relative block h-full w-full">
      <div className="absolute left-8 top-4 h-20 w-20">
        <Meow />
      </div>
      <div
        className="card absolute bottom-0 right-0 flex h-full w-2/3 flex-col justify-center gap-1 bg-surface pl-2 font-bold"
        style={{
          clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  )
}
