import { create } from 'zustand'

interface CommandState {
  pages: string[]
  open: boolean
  pushPage: (page: string) => void
  popPage: () => void
  setOpen: (open: boolean) => void
  toggle: () => void
}

export const useCommand = create<CommandState>((set) => ({
  pages: ['root'],
  open: false,
  pushPage: (page: string) =>
    set((state) => ({
      pages: [...state.pages, page],
    })),
  popPage: () =>
    set((state) => {
      if (state.pages.length <= 1) return state
      return { pages: state.pages.slice(0, -1) }
    }),
  setOpen: (open: boolean) => {
    if (!open) {
      set({ pages: ['root'] })
    }
    set({ open })
  },
  toggle: () => set((state) => ({ open: !state.open })),
}))

export const useActivePage = () =>
  useCommand((state) => state.pages[state.pages.length - 1])
