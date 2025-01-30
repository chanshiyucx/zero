import type { CommandItemProps } from '../types'
import clsx from 'clsx'
import { Command } from 'cmdk'
import { useCommand } from '../hooks/use-command'

export const CommandItem = ({
  onSelect,
  icon,
  shortcut,
  children,
  page,
  className,
}: CommandItemProps) => {
  const { pushPage } = useCommand()

  return (
    <Command.Item
      onSelect={() => {
        if (page && pushPage) {
          pushPage(page)
        } else if (onSelect) {
          onSelect()
        }
      }}
      className="text-subtle data-[selected=true]:bg-muted/10 data-[selected=true]:text-text m-0 flex cursor-pointer items-center justify-between gap-5 rounded-lg p-2 transition-colors"
    >
      <div className="flex shrink-0 items-center">
        {icon}
        <span
          className={clsx(
            '"inline-block whitespace-nowrap" overflow-hidden text-ellipsis',
            className,
          )}
        >
          {children}
        </span>
      </div>
      {shortcut && (
        <div className="flex gap-1">
          {shortcut.map((key) => (
            <kbd key={key}>{key}</kbd>
          ))}
        </div>
      )}
    </Command.Item>
  )
}
