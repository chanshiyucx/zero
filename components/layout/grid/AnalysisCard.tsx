import type { ReactNode } from 'react'
import {
  Notebook,
  Scroll,
  TerminalWindow,
} from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Image from 'next/image'
import { summary } from '@/lib/utils/content'

type StatProps = {
  icon: ReactNode
  label: string
  value: number
  className: string
}

function Stat({ icon, label, value, className }: StatProps) {
  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {icon}
      <span className="text-sm">{label}:</span>
      {value}
    </div>
  )
}

export function AnalysisCard() {
  const { posts, notes, leetcodes } = summary()

  const stats = [
    {
      icon: <Scroll size="1em" weight="duotone" />,
      label: 'Posts',
      value: posts,
      className: 'translate-x-36',
    },
    {
      icon: <Notebook size="1em" weight="duotone" />,
      label: 'Notes',
      value: notes,
      className: 'translate-x-28',
    },
    {
      icon: <TerminalWindow size="1em" weight="duotone" />,
      label: 'Leetcode',
      value: leetcodes,
      className: 'translate-x-20',
    },
  ]

  return (
    <div className="relative block h-full w-full">
      <Image
        src="/apple-touch-icon.png"
        alt="Github"
        width={100}
        height={100}
        className="absolute left-8 top-0 opacity-80"
      />
      <div
        className="card absolute bottom-0 right-0 flex h-full w-2/3 flex-col justify-center gap-1 bg-overlay font-bold"
        style={{
          clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        {stats.map((stat, index) => (
          <Stat key={index} {...stat} />
        ))}
      </div>
    </div>
  )
}
