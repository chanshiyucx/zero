'use client'

import type { Theme } from '@/type'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  Desktop,
  Icon,
  Moon,
  PaintBrushBroad,
  Sun,
} from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import useIsMounted from '@/hook/use-is-mounted'
import { transitionViewIfSupported } from '@/lib/dom'

const ThemeList: Theme[] = ['light', 'dark', 'system'] as const

const ThemeRecord: Record<Theme, { icon: Icon; label: string }> = {
  light: {
    icon: Sun,
    label: 'Light',
  },
  dark: {
    icon: Moon,
    label: 'Dark',
  },
  system: {
    icon: Desktop,
    label: 'System',
  },
} as const

function useThemeTransition() {
  const { setTheme, theme: currTheme } = useTheme()

  const toggleTheme = useCallback(
    (nextTheme: Theme) => {
      transitionViewIfSupported(() => {
        flushSync(() => setTheme(nextTheme))
      })
    },
    [setTheme],
  )

  return {
    currTheme,
    toggleTheme,
  }
}

const SelectTheme: React.FC<{ theme: Theme }> = ({ theme }) => {
  const { toggleTheme, currTheme } = useThemeTransition()

  const { icon: Icon, label } = ThemeRecord[theme]
  const isActive = currTheme === theme

  return (
    <MenuItem
      as="button"
      onClick={() => toggleTheme(theme)}
      data-active={currTheme === theme}
      className="hover:dark:bg-zinc-1000 flex w-full items-center justify-start gap-4 rounded-xl p-2 text-lg leading-none hover:bg-zinc-100 data-[active='true']:font-bold"
    >
      <Icon size="1em" weight={isActive ? 'duotone' : 'regular'} />
      <span>{label}</span>
    </MenuItem>
  )
}

export default function ThemeSwitcher() {
  const mounted = useIsMounted()

  return (
    <Menu as="div" className="relative inline-flex items-center">
      <MenuButton aria-label="Change color theme" title="Change color theme">
        <PaintBrushBroad size="1em" className="text-xl" />
      </MenuButton>
      {mounted && (
        <MenuItems
          as="div"
          className="animate-fade-down animate-duration-300 absolute right-0 top-10 origin-top-right rounded-xl bg-zinc-50 p-1 outline-none dark:bg-zinc-950"
        >
          {ThemeList.map((theme) => (
            <SelectTheme key={theme} theme={theme} />
          ))}
        </MenuItems>
      )}
    </Menu>
  )
}
