import type { Theme } from '@/type'
import type { Icon } from '@phosphor-icons/react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  Desktop,
  Moon,
  PaintBrushBroad,
  Sun,
} from '@phosphor-icons/react/dist/ssr'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useIsMounted } from '@/hook'
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
}

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
      data-isactive={isActive}
      className="menuitem flex w-full items-center justify-start gap-5 rounded-lg p-2 data-[isactive='true']:font-bold"
    >
      <Icon size="1em" weight={isActive ? 'duotone' : 'regular'} />
      <span>{label}</span>
    </MenuItem>
  )
}

export function ThemeSwitcher() {
  const mounted = useIsMounted()

  return (
    <Menu>
      <MenuButton aria-label="Change color theme" title="Change color theme">
        <PaintBrushBroad className="text-xl" />
      </MenuButton>
      {mounted && (
        <MenuItems className="card absolute right-0 top-14 origin-top-right animate-fade-down rounded-lg outline-none animate-duration-300">
          <div className="p-2 backdrop-blur">
            {ThemeList.map((theme) => (
              <SelectTheme key={theme} theme={theme} />
            ))}
          </div>
        </MenuItems>
      )}
    </Menu>
  )
}
