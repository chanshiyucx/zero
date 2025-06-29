import { create } from 'zustand'

export const Polyglot = {
  Deutsch: 'de',
  English: 'en',
} as const

type Language = keyof typeof Polyglot
type LanguageValue = (typeof Polyglot)[Language]

interface PolyglotState {
  language: LanguageValue
  hasMultipleLanguage: boolean
  toggleLanguage: () => void
  setHasMultipleLanguage: (val: boolean) => void
}

export const usePolyglotStore = create<PolyglotState>((set, get) => ({
  language: Polyglot.Deutsch,
  hasMultipleLanguage: true,
  toggleLanguage: () => {
    const current = get().language
    set({
      language:
        current === Polyglot.Deutsch ? Polyglot.English : Polyglot.Deutsch,
    })
  },
  setHasMultipleLanguage: (val: boolean) => set({ hasMultipleLanguage: val }),
}))
