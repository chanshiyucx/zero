import { createContext } from 'react'

interface CommandState {
  activePage: string
  pushPage: (page: string) => void
  popPage: () => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
}

export const CommandContext = createContext<CommandState | null>(null)
