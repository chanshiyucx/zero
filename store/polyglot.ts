import { create } from 'zustand'

export const Polyglot = {
  Deutsch: 'de',
  English: 'en',
} as const

type Language = keyof typeof Polyglot
type LanguageValue = (typeof Polyglot)[Language]

interface PolyglotState {
  language: LanguageValue
  toggleLanguage: () => void
}

export const usePolyglotStore = create<PolyglotState>((set, get) => ({
  language: Polyglot.Deutsch,
  toggleLanguage: () => {
    const current = get().language
    set({
      language:
        current === Polyglot.Deutsch ? Polyglot.English : Polyglot.Deutsch,
    })
  },
}))
