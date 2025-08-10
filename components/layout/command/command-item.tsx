import { Command } from 'cmdk'
import { useCallback, type ReactNode } from 'react'
import { cn } from '@/lib/utils/style'
import { useCommand } from '@/stores/use-command'

interface CommandItemProps {
  onSelect?: () => void
  icon?: ReactNode
  shortcut?: string[]
  page?: string
  className?: string
  children: ReactNode
}

export const CommandItem = ({
  onSelect,
  icon,
  shortcut,
  children,
  page,
  className,
}: CommandItemProps) => {
  const { pushPage } = useCommand()
  const handleSelect = useCallback(() => {
    if (page) {
      pushPage(page)
    } else if (onSelect) {
      onSelect()
    }
  }, [page, onSelect, pushPage])

  return (
    <Command.Item
      onSelect={handleSelect}
      className="text-subtle data-[selected=true]:bg-muted/10 data-[selected=true]:text-text m-0 flex cursor-pointer items-center justify-between gap-5 rounded-lg p-2 transition-colors"
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
