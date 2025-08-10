import { create } from 'zustand'

interface DeviceState {
  isMobile: boolean
  setIsMobile: (value: boolean) => void
}

export const useDevice = create<DeviceState>((set) => ({
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
}))
