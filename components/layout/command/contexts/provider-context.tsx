import { createContext } from 'react'

interface CommandProviderState {
  toggle: () => void
}

export const CommandProviderContext =
  createContext<CommandProviderState | null>(null)
