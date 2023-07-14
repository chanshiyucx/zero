'use client'

import type { ThemeType } from '@/type'
import type { ReactNode } from 'react'
import { createContext, useLayoutEffect } from 'react'
import { Nya, random } from '@/utils'
import { useLocalStorage } from '@/utils/hook'
import themeList from '@/utils/theme'

Nya()

const randomTheme = themeList[random(0, themeList.length)]

interface ThemeProps {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

export const ThemeContext = createContext({} as ThemeProps)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<ThemeType>('theme', randomTheme.type, 24 * 60 * 60 * 1000)

  useLayoutEffect(() => {
    console.log('切换主题：', theme)
    const t = themeList.find((e) => e.type === theme)
    if (!t) return
    document.documentElement.style.setProperty('--theme-color', t.color.primary)
    document.documentElement.style.setProperty('--background-color', t.color.background)
    document.documentElement.style.setProperty('--background-image', `url('${t.image.src}')`)
    const element = document.getElementsByTagName('body')[0]
    const classList = themeList.map((e) => e.type)
    element.classList.remove(...classList)
    element.classList.add(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
