'use client'

import { type IconProps } from '@phosphor-icons/react/dist/lib/types'
import {
  BriefcaseIcon,
  CameraIcon,
  GhostIcon,
  MapTrifoldIcon,
  NotebookIcon,
  ScrollIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react/dist/ssr'
import {
  AnimatePresence,
  m,
  type Transition,
  type Variants,
} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { English, German } from '@/components/icons'
import { isExternalLink } from '@/lib/utils/helper'
import { cn } from '@/lib/utils/style'

const iconProps: Partial<IconProps> = {
  size: '1em',
  weight: 'duotone',
  className: 'inline-block text-xl shrink-0',
}

interface Action {
  icon: ReactNode
  label: string
  path?: string
  page?: string
  className?: string
}

interface ActionGroup {
  heading?: string
  items: Action[]
}

const transition: Transition = { type: 'spring', stiffness: 500, damping: 30 }

const backdropVariants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
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

const actionGroups: ActionGroup[] = [
  {
    heading: 'Navigation',
    items: [
      {
        icon: <BriefcaseIcon {...iconProps} />,
        label: 'Projects',
        path: '/projects',
      },
      {
        icon: <GhostIcon {...iconProps} />,
        label: 'Vibes',
        path: '/vibes',
      },
      {
        icon: <CameraIcon {...iconProps} />,
        label: 'Album',
        path: '/album',
      },
    ],
  },
  {
    heading: 'Blog',
    items: [
      {
        icon: <ScrollIcon {...iconProps} />,
        label: 'Posts',
        path: '/blog/posts',
      },
      {
        icon: <NotebookIcon {...iconProps} />,
        label: 'Snippets',
        path: '/blog/snippets',
      },
      {
        icon: <TerminalWindowIcon {...iconProps} />,
        label: 'Leetcode',
        path: '/blog/leetcode',
      },
    ],
  },
  {
    heading: 'Polyglot',
    items: [
      {
        icon: <PolyglotIcon language="english" />,
        label: 'English',
        path: '/polyglot/english',
      },
      {
        icon: <PolyglotIcon language="german" />,
        label: 'German',
        path: '/polyglot/german',
      },
    ],
  },
]

export function Menu() {
  const [open, setOpen] = useState(false)
  const { push } = useRouter()

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

  const handleOnSelect = useCallback(
    (item: Pick<Action, 'path'>) => {
      if (item.path) {
        navigateAndClose(item.path)
      }
    },
    [navigateAndClose],
  )

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="hidden max-md:block"
      >
        <MapTrifoldIcon weight="duotone" className="text-xl" />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            className="bg-overlay/60 fixed inset-0 z-100 backdrop-blur-xs"
            variants={backdropVariants}
            transition={transition}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setOpen(false)}
          >
            <div className="fixed inset-0 flex items-center justify-center">
              <m.div
                className="relative w-[45vw] min-w-xl max-sm:fixed max-sm:bottom-0 max-sm:w-screen max-sm:min-w-auto"
                onClick={(e) => e.stopPropagation()}
                variants={modalVariants}
                transition={transition}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="bg-surface text-subtle space-y-3 rounded-lg p-3 shadow-lg max-sm:rounded-b-none">
                  {actionGroups.map((group) => (
                    <div key={group.heading}>
                      <div className="p-2 text-sm">{group.heading}</div>
                      {group.items.map((item) => (
                        <div
                          key={item.path}
                          onClick={() => handleOnSelect(item)}
                          className="flex cursor-pointer items-center justify-start gap-3 p-2"
                        >
                          {item.icon}
                          {item.label}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
