import { Command } from 'cmdk'
import type { ReactNode } from 'react'
import { useActivePage } from '@/store/command'

interface CommandGroupProps {
  heading: string
  page?: string
  children: ReactNode
}

export const CommandGroup = ({
  heading,
  children,
  page,
}: CommandGroupProps) => {
  const activePage = useActivePage()
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
