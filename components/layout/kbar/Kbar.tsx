import clsx from 'clsx'
import {
  ActionImpl,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
} from 'kbar'
import { forwardRef, ReactNode } from 'react'

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[45vw] space-y-4 rounded-lg bg-surface p-6 shadow-lg max-md:w-[96vw]">
      {children}
    </div>
  )
}

const Search = () => (
  <div className="border-b px-3 pb-4">
    <KBarSearch
      className="w-full border-none bg-transparent outline-none"
      placeholder="Type a command or search..."
    />
  </div>
)

const ResultItem = forwardRef<
  HTMLDivElement,
  {
    action: ActionImpl
    active: boolean
  }
>(({ action, active }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'm-0 flex cursor-pointer items-center justify-between gap-5 rounded-lg p-2 transition-colors',
        active ? 'bg-muted/10 text-text' : 'text-subtle',
      )}
    >
      <div
        className={clsx(
          'flex items-center overflow-hidden text-ellipsis whitespace-nowrap',
          action.id.startsWith('link') && 'link',
        )}
      >
        {action.icon}
        {action.name}
      </div>
      {action.shortcut && (
        <div className="flex gap-1">
          {action.shortcut.map((shortcut) => (
            <kbd key={shortcut}>{shortcut}</kbd>
          ))}
        </div>
      )}
    </div>
  )
})
ResultItem.displayName = 'ResultItem'

const SectionTitle = forwardRef<HTMLDivElement, { title: string }>(
  ({ title }, ref) => (
    <div ref={ref} className="p-3 text-sm">
      {title}
    </div>
  ),
)
SectionTitle.displayName = 'SectionTitle'

function RenderResults() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <SectionTitle title={item} />
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  )
}

export function KBar() {
  return (
    <KBarPortal>
      <KBarPositioner className="z-50 bg-muted/20 backdrop-blur-sm">
        <KBarAnimator>
          <Content>
            <Search />
            <RenderResults />
          </Content>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}
