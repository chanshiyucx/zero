'use client'

import { type IconProps } from '@phosphor-icons/react/dist/lib/types'
import {
  BriefcaseIcon,
  CameraIcon,
  GhostIcon,
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
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { English, German } from '@/components/icons'
import { useShortcut } from '@/hooks/use-shortcut'
import { siteConfig } from '@/lib/constants/config'
import {
  sortedLeetcodes,
  sortedNotes,
  sortedPolyglots,
  sortedPosts,
} from '@/lib/utils/content'
import { isExternalLink } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'
import { useCommand } from '@/stores/use-command'
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
  path?: string
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
        <English
          {...iconProps}
          className={cn(iconProps.className, 'text-subtle text-base')}
        />
      ) : (
        <German
          {...iconProps}
          className={cn(iconProps.className, 'text-subtle text-base')}
        />
      )}
    </>
  )
}

export function Command() {
  const { open, toggle, setOpen, pushPage } = useCommand()
  const { register, handleKeypress } = useShortcut()
  const { push } = useRouter()
  const contentLists = useMemo(
    () => ({
      posts: sortedPosts,
      notes: sortedNotes,
      leetcodes: sortedLeetcodes,
      polyglots: sortedPolyglots,
    }),
    [],
  )

  const navigateAndClose = useCallback(
    (path: string) => {
      if (isExternalLink(path)) {
        window.open(path, '_blank')
      } else {
        push(path)
        setOpen(false)
      }
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

  const handleOnSelect = useCallback(
    ({ path, page }: { path?: string; page?: string }) => {
      if (path) {
        navigateAndClose(path)
      } else if (page) {
        pushPage(page)
      }
    },
    [navigateAndClose, pushPage],
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
            path: '/',
          },
          {
            icon: <BriefcaseIcon {...iconProps} />,
            label: 'Projects',
            shortcut: ['p'],
            path: '/projects',
          },
          {
            icon: <CameraIcon {...iconProps} />,
            label: 'Album',
            shortcut: ['a'],
            path: '/album',
          },
          {
            icon: <MagnifyingGlassIcon {...iconProps} />,
            label: 'Search',
            shortcut: ['s'],
            page: 'search',
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
            path: '/blog/posts',
          },
          {
            icon: <NotebookIcon {...iconProps} />,
            label: 'Notes',
            shortcut: ['n'],
            path: '/blog/notes',
          },
          {
            icon: <GhostIcon {...iconProps} />,
            label: 'Vibes',
            shortcut: ['v'],
            path: '/blog/vibes',
          },
          {
            icon: <TerminalWindowIcon {...iconProps} />,
            label: 'Leetcode',
            shortcut: ['l'],
            path: '/blog/leetcode',
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
            path: '/polyglot/english',
          },
          {
            icon: <PolyglotIcon language="german" />,
            label: 'German',
            shortcut: ['g'],
            path: '/polyglot/german',
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
            path: siteConfig.links.repo,
          },
          {
            icon: <XLogoIcon {...iconProps} />,
            label: 'Twitter',
            shortcut: [],
            className: 'link',
            path: siteConfig.links.twitter,
          },
          {
            icon: <LinkedinLogoIcon {...iconProps} />,
            label: 'LinkedIn',
            shortcut: [],
            className: 'link',
            path: siteConfig.links.linkedIn,
          },
          {
            icon: <LaptopIcon {...iconProps} />,
            label: 'Wakatime',
            shortcut: [],
            className: 'link',
            path: siteConfig.links.wakatime,
          },
        ],
      },
    ],
    [],
  )

  const searchGroups: ActionGroup[] = useMemo(
    () => [
      {
        heading: 'Navigation',
        page: 'search',
        items: [
          ...contentLists.posts.map((post) => ({
            icon: <ScrollIcon {...iconProps} />,
            label: post.title,
            shortcut: [],
            path: post.url,
          })),
          ...contentLists.notes.map((note) => ({
            icon: <NotebookIcon {...iconProps} />,
            label: note.title,
            shortcut: [],
            path: note.url,
          })),
          ...contentLists.leetcodes.map((leetcode) => ({
            icon: <TerminalWindowIcon {...iconProps} />,
            label: `${leetcode.no}-${leetcode.title}`,
            shortcut: [],
            path: leetcode.url,
          })),
          ...contentLists.polyglots.map((polyglot) => {
            const language = polyglot.tags[0].split('/')[0].toLowerCase()
            return {
              icon: <PolyglotIcon language={language} />,
              label: polyglot.title,
              shortcut: [],
              path: polyglot.url,
            }
          }),
        ],
      },
    ],
    [contentLists],
  )

  const allGroups = useMemo(
    () => [...actionGroups, ...searchGroups],
    [actionGroups, searchGroups],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
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

      // if (action.path) {
      //   register(action.shortcut, () => navigateAndClose(action.path))
      // } else if (action.page) {
      //   register(action.shortcut, () => openSearchPage(action.page))
      // }
    })
  }, [register, actionGroups, openSearchPage, navigateAndClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [open])

  if (!open) return null

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
              onSelect={() =>
                handleOnSelect({ path: item.path, page: item.page })
              }
              shortcut={item.shortcut}
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
