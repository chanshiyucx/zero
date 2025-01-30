import type { CommandGroupProps } from '../types'
import { Command } from 'cmdk'
import { useCommand } from '../hooks/use-command'

export const CommandGroup = ({
  heading,
  children,
  page = 'root',
}: CommandGroupProps) => {
  const { activePage } = useCommand()

  if (activePage !== page) return null

  return (
    <Command.Group
      heading={heading}
      className="[&>[cmdk-group-heading]]:text-subtle [&>[cmdk-group-heading]]:px-2 [&>[cmdk-group-heading]]:py-1.5 [&>[cmdk-group-heading]]:text-sm"
    >
      {children}
    </Command.Group>
  )
}
