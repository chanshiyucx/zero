'use client'

import { type IconProps } from '@phosphor-icons/react/dist/lib/types'
import {
  BriefcaseIcon,
  CameraIcon,
  GhostIcon,
  MagnifyingGlassIcon,
  NotebookIcon,
  ScrollIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { English, German } from '@/components/icons'
import { useShortcut } from '@/hooks/use-shortcut'
import {
  sortedLeetcodes,
  sortedPolyglots,
  sortedPosts,
  sortedSnippets,
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
}

interface Action {
  icon: ReactNode
  label: string
  shortcut: string[]
  path?: string
  page?: string
  className?: string
}

interface ActionGroup {
  heading?: string
  page: string
  items: Action[]
}

function PolyglotIcon({ language }: { language: string }) {
  return (
    <>
      {language === 'english' ? (
        <English
          weight="duotone"
          className={cn(
            iconProps.className,
            'text-subtle h-4.5 w-4.5 text-base',
          )}
        />
      ) : (
        <German
          weight="duotone"
          className={cn(
            iconProps.className,
            'text-subtle h-4.5 w-4.5 text-base',
          )}
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
      snippets: sortedSnippets,
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
    (item: Pick<Action, 'path' | 'page'>) => {
      if (item.path) {
        navigateAndClose(item.path)
      } else if (item.page) {
        pushPage(item.page)
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
            icon: <BriefcaseIcon {...iconProps} />,
            label: 'Projects',
            shortcut: ['p'],
            path: '/projects',
          },
          {
            icon: <GhostIcon {...iconProps} />,
            label: 'Vibes',
            shortcut: ['v'],
            path: '/vibes',
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
            label: 'Snippets',
            shortcut: ['n'],
            path: '/blog/snippets',
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
    ],
    [],
  )

  const searchGroups: ActionGroup[] = useMemo(
    () => [
      {
        page: 'search',
        items: [
          ...contentLists.posts.map((post) => ({
            icon: <ScrollIcon {...iconProps} />,
            label: post.title,
            shortcut: [],
            path: post.url,
          })),
          ...contentLists.snippets.map((snippet) => ({
            icon: <NotebookIcon {...iconProps} />,
            label: snippet.title,
            shortcut: [],
            path: snippet.url,
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

      if (action.path) {
        register(action.shortcut, () => navigateAndClose(action.path!))
      } else if (action.page) {
        register(action.shortcut, () => openSearchPage(action.page!))
      }
    })
  }, [register, actionGroups, openSearchPage, navigateAndClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [open])

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
              key={`${item.path}-${group.page}`}
              icon={item.icon}
              onSelect={() => handleOnSelect(item)}
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
