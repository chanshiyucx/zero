import type { IconProps } from '@phosphor-icons/react/dist/lib/types'
import {
  Briefcase,
  Camera,
  GithubLogo,
  House,
  Laptop,
  LinkedinLogo,
  MagnifyingGlass,
  Notebook,
  Scroll,
  SnapchatLogo,
  TerminalWindow,
  XLogo,
} from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { English, German } from '@/components/icons'
import { config } from '@/lib/constants/config'
import {
  sortedLeetcodes,
  sortedNotes,
  sortedPolyglots,
  sortedPosts,
} from '@/lib/utils/content'
import { CommandGroup, CommandItem, CommandMenu } from './components'
import { CommandProviderContext } from './contexts/provider-context'

const iconProps: Partial<IconProps> = {
  size: '1em',
  weight: 'duotone',
  className: 'inline-block text-xl mr-3 shrink-0',
}

const languageIcon = {
  english: (
    <English
      {...iconProps}
      className={clsx(iconProps.className, 'text-subtle text-base')}
    />
  ),
  german: (
    <German
      {...iconProps}
      className={clsx(iconProps.className, 'text-subtle text-base')}
    />
  ),
}

export function CommandProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { push } = useRouter()
  const postList = sortedPosts()
  const noteList = sortedNotes()
  const leetcodeList = sortedLeetcodes()
  const polyglotList = sortedPolyglots()

  const toggle = () => setOpen((prev) => !prev)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandProviderContext.Provider value={{ toggle }}>
      {open && (
        <CommandMenu setOpen={setOpen}>
          <CommandGroup heading="Navigation" page="root">
            <CommandItem
              icon={<House {...iconProps} />}
              onSelect={() => {
                push('/')
                setOpen(false)
              }}
              shortcut={['n', 'h']}
            >
              Home
            </CommandItem>
            <CommandItem
              icon={<Briefcase {...iconProps} />}
              onSelect={() => {
                push('/projects')
                setOpen(false)
              }}
              shortcut={['n', 'p']}
            >
              Projects
            </CommandItem>
            <CommandItem
              icon={<Camera {...iconProps} />}
              onSelect={() => {
                push('/album')
                setOpen(false)
              }}
              shortcut={['n', 'a']}
            >
              Album
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Blog" page="root">
            <CommandItem
              icon={<Scroll {...iconProps} />}
              onSelect={() => {
                push('/blog/posts')
                setOpen(false)
              }}
              shortcut={['b']}
            >
              Posts
            </CommandItem>
            <CommandItem
              icon={<Notebook {...iconProps} />}
              onSelect={() => {
                push('/blog/notes')
                setOpen(false)
              }}
              shortcut={['n']}
            >
              Notes
            </CommandItem>
            <CommandItem
              icon={<TerminalWindow {...iconProps} />}
              onSelect={() => {
                push('/blog/leetcode')
                setOpen(false)
              }}
              shortcut={['l']}
            >
              Leetcode
            </CommandItem>
            <CommandItem
              icon={<MagnifyingGlass {...iconProps} />}
              page="search-blog"
              shortcut={['b', 's']}
            >
              Search blog...
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Blog Posts" page="search-blog">
            {postList.map((post) => (
              <CommandItem
                key={post.slug}
                icon={<Scroll {...iconProps} />}
                onSelect={() => {
                  push(post.url)
                  setOpen(false)
                }}
              >
                {post.title}
              </CommandItem>
            ))}
            {noteList.map((note) => (
              <CommandItem
                key={note.slug}
                icon={<Notebook {...iconProps} />}
                onSelect={() => {
                  push(note.url)
                  setOpen(false)
                }}
              >
                {note.title}
              </CommandItem>
            ))}
            {leetcodeList.map((leetcode) => (
              <CommandItem
                key={leetcode.slug}
                icon={<TerminalWindow {...iconProps} />}
                onSelect={() => {
                  push(leetcode.url)
                  setOpen(false)
                }}
              >
                {`${leetcode.no}-${leetcode.title}`}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Polyglot" page="root">
            <CommandItem
              icon={languageIcon.english}
              onSelect={() => {
                push('/polyglot/english')
                setOpen(false)
              }}
              shortcut={['e']}
            >
              English
            </CommandItem>
            <CommandItem
              icon={languageIcon.german}
              onSelect={() => {
                push('/polyglot/german')
                setOpen(false)
              }}
              shortcut={['g']}
            >
              German
            </CommandItem>
            <CommandItem
              icon={<MagnifyingGlass {...iconProps} />}
              page="search-polyglot"
              shortcut={['p', 's']}
            >
              Search polyglot...
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Polyglot Posts" page="search-polyglot">
            {polyglotList.map((polyglot) => {
              const language = polyglot.tags[0].split('/')[0].toLowerCase()
              return (
                <CommandItem
                  key={polyglot.slug}
                  icon={languageIcon[language as keyof typeof languageIcon]}
                  onSelect={() => {
                    push(polyglot.url)
                    setOpen(false)
                  }}
                >
                  {polyglot.title}
                </CommandItem>
              )
            })}
          </CommandGroup>

          <CommandGroup heading="Website">
            <CommandItem
              icon={<SnapchatLogo {...iconProps} />}
              onSelect={() => {
                push('/friends')
                setOpen(false)
              }}
            >
              Friends
            </CommandItem>
            <CommandItem
              icon={<GithubLogo {...iconProps} />}
              onSelect={() => window.open(config.links.repo, '_blank')}
              className="link"
            >
              Github
            </CommandItem>
            <CommandItem
              icon={<XLogo {...iconProps} />}
              onSelect={() => window.open(config.links.twitter, '_blank')}
              className="link"
            >
              Twitter
            </CommandItem>
            <CommandItem
              icon={<LinkedinLogo {...iconProps} />}
              onSelect={() => window.open(config.links.linkedIn, '_blank')}
              className="link"
            >
              LinkedIn
            </CommandItem>
            <CommandItem
              icon={<Laptop {...iconProps} />}
              onSelect={() => window.open(config.links.wakatime, '_blank')}
              className="link"
            >
              Wakatime
            </CommandItem>
          </CommandGroup>
        </CommandMenu>
      )}
      {children}
    </CommandProviderContext.Provider>
  )
}
