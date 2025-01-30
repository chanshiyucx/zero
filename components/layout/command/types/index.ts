import type { ReactNode } from 'react'

export interface CommandState {
  activePage: string
  pushPage: (page: string) => void
  popPage: () => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
}

export interface CommandProviderState {
  toggle: () => void
}

export interface CommandBaseProps {
  children: ReactNode
}

export interface CommandMenuProps extends CommandBaseProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CommandItemProps extends CommandBaseProps {
  onSelect?: () => void
  icon?: ReactNode
  shortcut?: string[]
  page?: string
  className?: string
}

export interface CommandGroupProps extends CommandBaseProps {
  heading: string
  page?: string
}
