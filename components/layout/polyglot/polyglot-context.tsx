import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

export const Polyglot = {
  Deutsch: 'de',
  English: 'en',
} as const

type Language = (typeof Polyglot)[keyof typeof Polyglot]

interface PolyglotContextValue {
  language: Language
  toggleLanguage: () => void
}

const PolyglotContext = createContext<PolyglotContextValue | undefined>(
  undefined,
)

export function PolyglotProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(Polyglot.Deutsch)

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) =>
      prev === Polyglot.Deutsch ? Polyglot.English : Polyglot.Deutsch,
    )
  }, [])

  return (
    <PolyglotContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </PolyglotContext.Provider>
  )
}

export function usePolyglot() {
  const context = useContext(PolyglotContext)
  if (!context) {
    throw new Error('usePolyglot must be used within a PolyglotProvider')
  }
  return context
}
