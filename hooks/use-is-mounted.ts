import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => void 0

export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}
