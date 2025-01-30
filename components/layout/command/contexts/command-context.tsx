import type { CommandState } from '../types'
import { createContext } from 'react'

export const CommandContext = createContext<CommandState | null>(null)
