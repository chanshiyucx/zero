'use client'

import type { IconProps } from '@phosphor-icons/react/dist/lib/types'
import {
  BriefcaseIcon,
  CameraIcon,
  GithubLogoIcon,
  HouseIcon,
  LaptopIcon,
  LinkedinLogoIcon,
  MagnifyingGlassIcon,
  NotebookIcon,
  ScrollIcon,
  TerminalWindowIcon,
  XLogoIcon,
} from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { English, German } from '@/components/icons'
import { useShortcut } from '@/hook'
import { siteConfig } from '@/lib/constants/config'
import {
  sortedLeetcodes,
  sortedNotes,
  sortedPolyglots,
  sortedPosts,
} from '@/lib/utils/content'
import { useCommandStore } from '@/store/command'
import { CommandGroup } from './command-group'
import { CommandItem } from './command-item'
import { CommandMenu } from './command-menu'

const iconProps: Partial<IconProps> = {
  size: '1em',
  weight: 'duotone',
  className: 'inline-block text-xl mr-3 shrink-0',
} as const

interface Action {
  icon: ReactNode
  label: string
  shortcut: string[]
  onSelect?: () => void
  page?: string
  className?: string
}

interface ActionGroup {
  heading: string
  page: string
  items: Action[]
}

function PolyglotIcon({ language }: { language: string }) {
  return (
    <>
      {language === 'english' ? (
        <German
          {...iconProps}
          className={clsx(iconProps.className, 'text-subtle text-base')}
        />
      ) : (
        <English
          {...iconProps}
          className={clsx(iconProps.className, 'text-subtle text-base')}
        />
      )}
    </>
  )
}

export function Command() {
  const { open, toggle, setOpen, pushPage } = useCommandStore()
  const { register, handleKeypress } = useShortcut()
  const { push } = useRouter()
  const contentLists = useMemo(
    () => ({
      posts: sortedPosts(),
      notes: sortedNotes(),
      leetcodes: sortedLeetcodes(),
      polyglots: sortedPolyglots(),
    }),
    [],
  )

  const navigateAndClose = useCallback(
    (path: string) => {
      push(path)
      setOpen(false)
    },
    [push, setOpen],
  )

  const openSearchPage = useCallback(
    (page: string) => {
      setOpen(true)
      pushPage(page)
    },
    [setOpen, pushPage],
  )

  const actionGroups: ActionGroup[] = useMemo(
    () => [
      {
        heading: 'Navigation',
        page: 'root',
        items: [
          {
            icon: <HouseIcon {...iconProps} />,
            label: 'Home',
            shortcut: ['h'],
            onSelect: () => navigateAndClose('/'),
          },
          {
            icon: <BriefcaseIcon {...iconProps} />,
            label: 'Projects',
            shortcut: ['w'],
            onSelect: () => navigateAndClose('/projects'),
          },
          {
            icon: <CameraIcon {...iconProps} />,
            label: 'Album',
            shortcut: ['a'],
            onSelect: () => navigateAndClose('/album'),
          },
        ],
      },
      {
        heading: 'Blog',
        page: 'root',
        items: [
          {
            icon: <ScrollIcon {...iconProps} />,
            label: 'Posts',
            shortcut: ['b'],
            onSelect: () => navigateAndClose('/blog/posts'),
          },
          {
            icon: <NotebookIcon {...iconProps} />,
            label: 'Notes',
            shortcut: ['n'],
            onSelect: () => navigateAndClose('/blog/notes'),
          },
          {
            icon: <TerminalWindowIcon {...iconProps} />,
            label: 'Leetcode',
            shortcut: ['l'],
            onSelect: () => navigateAndClose('/blog/leetcode'),
          },
          {
            icon: <MagnifyingGlassIcon {...iconProps} />,
            label: 'Search blog...',
            shortcut: ['b', 's'],
            page: 'search-blog',
          },
        ],
      },
      {
        heading: 'Polyglot',
        page: 'root',
        items: [
          {
            icon: <PolyglotIcon language="english" />,
            label: 'English',
            shortcut: ['e'],
            onSelect: () => navigateAndClose('/polyglot/english'),
          },
          {
            icon: <PolyglotIcon language="german" />,
            label: 'German',
            shortcut: ['g'],
            onSelect: () => navigateAndClose('/polyglot/german'),
          },
          {
            icon: <MagnifyingGlassIcon {...iconProps} />,
            label: 'Search polyglot...',
            shortcut: ['p', 's'],
            page: 'search-polyglot',
          },
        ],
      },
      {
        heading: 'Website',
        page: 'root',
        items: [
          {
            icon: <GithubLogoIcon {...iconProps} />,
            label: 'Github',
            shortcut: [],
            className: 'link',
            onSelect: () => window.open(siteConfig.links.repo, '_blank'),
          },
          {
            icon: <XLogoIcon {...iconProps} />,
            label: 'Twitter',
            shortcut: [],
            className: 'link',
            onSelect: () => window.open(siteConfig.links.twitter, '_blank'),
          },
          {
            icon: <LinkedinLogoIcon {...iconProps} />,
            label: 'LinkedIn',
            shortcut: [],
            className: 'link',
            onSelect: () => window.open(siteConfig.links.linkedIn, '_blank'),
          },
          {
            icon: <LaptopIcon {...iconProps} />,
            label: 'Wakatime',
            shortcut: [],
            className: 'link',
            onSelect: () => window.open(siteConfig.links.wakatime, '_blank'),
          },
        ],
      },
    ],
    [navigateAndClose],
  )

  const searchGroups: ActionGroup[] = useMemo(
    () => [
      {
        heading: 'Blog',
        page: 'search-blog',
        items: [
          ...contentLists.posts.map((post) => ({
            icon: <ScrollIcon {...iconProps} />,
            label: post.title,
            shortcut: [],
            onSelect: () => navigateAndClose(post.url),
          })),
          ...contentLists.notes.map((note) => ({
            icon: <NotebookIcon {...iconProps} />,
            label: note.title,
            shortcut: [],
            onSelect: () => navigateAndClose(note.url),
          })),
          ...contentLists.leetcodes.map((leetcode) => ({
            icon: <TerminalWindowIcon {...iconProps} />,
            label: `${leetcode.no}-${leetcode.title}`,
            shortcut: [],
            onSelect: () => navigateAndClose(leetcode.url),
          })),
        ],
      },
      {
        heading: 'Polyglot',
        page: 'search-polyglot',
        items: contentLists.polyglots.map((polyglot) => {
          const language = polyglot.tags[0].split('/')[0].toLowerCase()
          return {
            icon: <PolyglotIcon language={language} />,
            label: polyglot.title,
            shortcut: [],
            onSelect: () => navigateAndClose(polyglot.url),
          }
        }),
      },
    ],
    [contentLists, navigateAndClose],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
        return
      }
      if (open) return
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return

      e.preventDefault()
      handleKeypress(e.key.toLowerCase())
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, toggle, handleKeypress])

  useEffect(() => {
    const allActions = actionGroups.flatMap((group) => group.items)

    allActions.forEach((action) => {
      if (action.shortcut.length === 0) return

      if (action.onSelect) {
        register(action.shortcut, action.onSelect)
      } else if (action.page) {
        register(action.shortcut, () => openSearchPage(action.page!))
      }
    })
  }, [register, actionGroups, openSearchPage])

  if (!open) return null

  const allGroups = [...actionGroups, ...searchGroups]

  return (
    <CommandMenu>
      {allGroups.map((group) => (
        <CommandGroup
          key={`${group.heading}-${group.page}`}
          heading={group.heading}
          page={group.page}
        >
          {group.items.map((item) => (
            <CommandItem
              key={`${item.label}-${group.page}`}
              icon={item.icon}
              shortcut={item.shortcut}
              onSelect={item.onSelect}
              page={item.page}
              className={item.className}
            >
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </CommandMenu>
  )
}
