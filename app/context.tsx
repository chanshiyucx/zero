'use client'

import type { ThemeType } from '@/type'
import type { ReactNode } from 'react'
import { createContext, useEffect, useLayoutEffect } from 'react'
import { Nya } from '@/utils'
import { useLocalStorage } from '@/utils/hook'
import themeList from '@/utils/theme'

Nya()

interface ThemeProps {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

export const ThemeContext = createContext({} as ThemeProps)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useLocalStorage<number>('viewCount', 0)
  // 默认第一次访问是胡桃主题
  const randomIndex = count % themeList.length
  const randomTheme = themeList[randomIndex]
  useEffect(() => {
    setCount(count + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
