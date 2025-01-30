import type { CommandProviderState } from '../types'
import { createContext } from 'react'

export const CommandProviderContext =
  createContext<CommandProviderState | null>(null)
