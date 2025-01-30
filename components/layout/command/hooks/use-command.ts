import { useContext } from 'react'
import { CommandContext } from '../contexts/command-context'
import { CommandProviderContext } from '../contexts/provider-context'

export const useCommand = () => {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error('Command components must be used within CommandMenu')
  }
  return context
}

export const useCommandProvider = () => {
  const context = useContext(CommandProviderContext)
  if (!context) {
    throw new Error('useCommandProvider must be used within CommandProvider')
  }
  return context
}
