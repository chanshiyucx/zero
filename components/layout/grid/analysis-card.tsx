import {
  NotebookIcon,
  ScrollIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { Meow } from '@/components/ui/meow'
import { summary } from '@/lib/utils/content'
import { cn } from '@/lib/utils/style'

type StatProps = {
  icon: ReactNode
  label: string
  value: number
  href: string
  className: string
}

function Stat({ icon, label, value, className, href }: StatProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {icon}
      <Link href={href} className="link-hover">
        <span className="mx-1 text-sm">{label}:</span>
        {value}
      </Link>
    </div>
  )
}

export function AnalysisCard() {
  const { posts, notes, leetcodes } = summary()

  const stats = [
    {
      icon: <ScrollIcon size="1em" weight="duotone" />,
      label: 'Posts',
      value: posts,
      href: '/blog/posts',
      className: 'translate-x-4/7',
    },
    {
      icon: <NotebookIcon size="1em" weight="duotone" />,
      label: 'Notes',
      value: notes,
      href: '/blog/notes',
      className: 'translate-x-3/7',
    },
    {
      icon: <TerminalWindowIcon size="1em" weight="duotone" />,
      label: 'Leetcode',
      value: leetcodes,
      href: '/blog/leetcode',
      className: 'translate-x-2/7',
    },
  ]

  const links = stats.map((stat) => stat.href)

  return (
    <div className="relative block h-24 w-full">
      <div className="absolute bottom-0 left-4 h-fit w-20">
        <Meow links={links} />
      </div>
      <div
        className="bg-surface absolute right-0 bottom-0 flex h-full w-2/3 flex-col justify-center gap-1 overflow-hidden rounded-lg pl-2 font-bold"
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
