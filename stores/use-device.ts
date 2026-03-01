import { create } from 'zustand'

type DeviceState = {
  isMobile: boolean
  setIsMobile: (value: boolean) => void
}

export const useDevice = create<DeviceState>((set) => ({
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
}))
