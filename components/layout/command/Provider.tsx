import type { IconProps } from '@phosphor-icons/react/dist/lib/types'
import {
  ArticleMediumIcon,
  BriefcaseIcon,
  CameraIcon,
  GithubLogoIcon,
  HouseIcon,
  LaptopIcon,
  LinkedinLogoIcon,
  MagnifyingGlassIcon,
  NotebookIcon,
  ScrollIcon,
  // SnapchatLogoIcon,
  TerminalWindowIcon,
  XLogoIcon,
} from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { siteConfig } from '@/lib/constants/config'
import {
  sortedLeetcodes,
  sortedNotes,
  sortedPolyglots,
  sortedPosts,
} from '@/lib/utils/content'
import { CommandGroup } from './command-group'
import { CommandItem } from './command-item'
import { CommandMenu } from './command-menu'
import { CommandProviderContext } from './contexts/provider-context'

const iconProps: Partial<IconProps> = {
  size: '1em',
  weight: 'duotone',
  className: 'inline-block text-xl mr-3 shrink-0',
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
              icon={<HouseIcon {...iconProps} />}
              onSelect={() => {
                push('/')
                setOpen(false)
              }}
              shortcut={['n', 'h']}
            >
              Home
            </CommandItem>
            <CommandItem
              icon={<BriefcaseIcon {...iconProps} />}
              onSelect={() => {
                push('/projects')
                setOpen(false)
              }}
              shortcut={['n', 'p']}
            >
              Projects
            </CommandItem>
            <CommandItem
              icon={<CameraIcon {...iconProps} />}
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
              icon={<ScrollIcon {...iconProps} />}
              onSelect={() => {
                push('/blog/posts')
                setOpen(false)
              }}
              shortcut={['b']}
            >
              Posts
            </CommandItem>
            <CommandItem
              icon={<NotebookIcon {...iconProps} />}
              onSelect={() => {
                push('/blog/notes')
                setOpen(false)
              }}
              shortcut={['n']}
            >
              Notes
            </CommandItem>
            <CommandItem
              icon={<TerminalWindowIcon {...iconProps} />}
              onSelect={() => {
                push('/blog/leetcode')
                setOpen(false)
              }}
              shortcut={['l']}
            >
              Leetcode
            </CommandItem>
            <CommandItem
              icon={<MagnifyingGlassIcon {...iconProps} />}
              page="search-blog"
              shortcut={['b', 's']}
            >
              Search blog...
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Blog" page="search-blog">
            {postList.map((post) => (
              <CommandItem
                key={post.slug}
                icon={<ScrollIcon {...iconProps} />}
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
                icon={<NotebookIcon {...iconProps} />}
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
                icon={<TerminalWindowIcon {...iconProps} />}
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
              icon={<ArticleMediumIcon {...iconProps} />}
              onSelect={() => {
                push('/polyglot')
                setOpen(false)
              }}
              shortcut={['p']}
            >
              Polyglot
            </CommandItem>
            <CommandItem
              icon={<MagnifyingGlassIcon {...iconProps} />}
              page="search-polyglot"
              shortcut={['p', 's']}
            >
              Search polyglot...
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Polyglot" page="search-polyglot">
            {polyglotList.map((polyglot) => {
              return (
                <CommandItem
                  key={polyglot.slug}
                  icon={<ArticleMediumIcon {...iconProps} />}
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
            {/* <CommandItem
              icon={<SnapchatLogoIcon {...iconProps} />}
              onSelect={() => {
                push('/friends')
                setOpen(false)
              }}
            >
              Friends
            </CommandItem> */}
            <CommandItem
              icon={<GithubLogoIcon {...iconProps} />}
              onSelect={() => window.open(siteConfig.links.repo, '_blank')}
              className="link"
            >
              Github
            </CommandItem>
            <CommandItem
              icon={<XLogoIcon {...iconProps} />}
              onSelect={() => window.open(siteConfig.links.twitter, '_blank')}
              className="link"
            >
              Twitter
            </CommandItem>
            <CommandItem
              icon={<LinkedinLogoIcon {...iconProps} />}
              onSelect={() => window.open(siteConfig.links.linkedIn, '_blank')}
              className="link"
            >
              LinkedIn
            </CommandItem>
            <CommandItem
              icon={<LaptopIcon {...iconProps} />}
              onSelect={() => window.open(siteConfig.links.wakatime, '_blank')}
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
