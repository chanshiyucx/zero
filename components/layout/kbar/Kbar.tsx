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
    <KBarSearch className="w-full border-none bg-transparent outline-none" />
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
      <div className="flex items-center gap-3">
        <span className="text-xl">{action.icon}</span>
        <div className="flex flex-col items-start justify-center">
          <div className="flex items-end gap-px">
            <span
              className={clsx(
                'leading-none',
                action.id.startsWith('out') && 'link link-out',
              )}
            >
              {action.name}
            </span>
          </div>
          {action.subtitle && (
            <span className="text-xs text-subtle">{action.subtitle}</span>
          )}
        </div>
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
      <KBarPositioner className="z-100 bg-muted/20 backdrop-blur-sm">
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
