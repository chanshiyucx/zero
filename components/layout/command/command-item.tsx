import { Command } from 'cmdk'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils/style'

interface CommandItemProps {
  onSelect?: () => void
  icon?: ReactNode
  shortcut?: string[]
  className?: string
  children: ReactNode
}

export const CommandItem = ({
  onSelect,
  icon,
  shortcut,
  children,
  className,
}: CommandItemProps) => {
  return (
    <Command.Item
      onSelect={onSelect}
      className="text-subtle m-0 flex cursor-pointer items-center justify-between gap-5 rounded-lg p-2 transition-colors"
    >
      <div className="flex shrink-0 items-center">
        {icon}
        <span
          className={cn(
            'inline-block overflow-hidden text-ellipsis whitespace-nowrap',
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
