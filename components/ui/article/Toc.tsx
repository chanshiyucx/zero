import { List } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Link from 'next/link'
import { TocEntry } from '@/lib/mdx/rehype-toc'

interface TocProps {
  toc: TocEntry[]
}

const getIndent = (depth: number) => {
  if (depth === 2) return 'ml-0'
  if (depth === 3) return 'ml-4'
  return 'ml-0'
}

export function Toc({ toc }: TocProps) {
  return (
    <aside className="relative -ml-64 hidden min-h-screen w-60 xl:block">
      <div className="sticky top-24 mt-20">
        <List
          size="1.5em"
          weight="bold"
          className="-ml-0.5 mb-3 mt-1 text-subtle opacity-40 transition-opacity duration-500 group-hover:opacity-100 hover:opacity-100"
        />
        <ul className="pr-3 text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100 hover:opacity-100">
          {toc.map((item) => (
            <li key={item.id} className="my-2">
              <Link
                href={`#${item.id}`}
                className={clsx(
                  'text-subtle underline decoration-muted/40 underline-offset-2 duration-300 hover:text-text hover:decoration-muted',
                  getIndent(item.depth),
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
