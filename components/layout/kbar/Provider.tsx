import type { IconProps } from '@phosphor-icons/react/dist/lib/types'
import type { Action } from 'kbar'
import type { ReactNode } from 'react'
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
import { KBarProvider } from 'kbar'
import { useRouter } from 'next/navigation'
import { English, German } from '@/components/icons'
import { config } from '@/lib/constants/config'
import {
  sortedLeetcodes,
  sortedNotes,
  sortedPolyglots,
  sortedPosts,
} from '@/lib/utils/content'
import { KBar } from './Kbar'

const iconProps: Partial<IconProps> = {
  size: '1em',
  weight: 'duotone',
  className: 'inline-block text-xl mr-3 flex-shrink-0',
}

const languageIcon = {
  english: (
    <English
      {...iconProps}
      className={clsx(iconProps.className, 'text-base text-subtle')}
    />
  ),
  german: (
    <German
      {...iconProps}
      className={clsx(iconProps.className, 'text-base text-subtle')}
    />
  ),
}

export function CustomKBarProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter()
  const postList = sortedPosts()
  const noteList = sortedNotes()
  const leetcodeList = sortedLeetcodes()
  const polyglotList = sortedPolyglots()

  const navigationActions: Action[] = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['n', 'h'],
      keywords: 'homepage main',
      icon: <House {...iconProps} />,
      perform: () => push('/'),
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['n', 'p'],
      keywords: 'projects writing',
      icon: <Briefcase {...iconProps} />,
      perform: () => push('/projects'),
    },
    {
      id: 'album',
      name: 'Album',
      shortcut: ['n', 'a'],
      keywords: 'album photography',
      icon: <Camera {...iconProps} />,
      perform: () => push('/album'),
    },
  ]

  const postsAsAction: Action[] = postList.map((post) => ({
    id: post.slug,
    name: post.title,
    icon: <Scroll {...iconProps} />,
    keywords: post.tags.toString().replaceAll(',', ' '),
    parent: 'search-blog',
    section: 'Blog',
    perform: () => push(post.url),
  }))

  const notesAsAction: Action[] = noteList.map((note) => ({
    id: note.slug,
    name: note.title,
    icon: <Notebook {...iconProps} />,
    keywords: note.tags.toString().replaceAll(',', ' '),
    parent: 'search-blog',
    section: 'Blog',
    perform: () => push(note.url),
  }))

  const leetcodeAsAction: Action[] = leetcodeList.map((leetcode) => ({
    id: leetcode.slug,
    name: `${leetcode.no}-${leetcode.title}`,
    icon: <TerminalWindow {...iconProps} />,
    keywords: leetcode.tags.toString().replaceAll(',', ' '),
    parent: 'search-blog',
    section: 'Blog',
    perform: () => push(leetcode.url),
  }))

  const blogActions: Action[] = [
    {
      id: 'posts',
      name: 'Posts',
      shortcut: ['b'],
      section: 'Blog',
      keywords: 'posts writing',
      icon: <Scroll {...iconProps} />,
      perform: () => push('/blog/posts'),
    },
    {
      id: 'notes',
      name: 'Notes',
      shortcut: ['n'],
      section: 'Blog',
      keywords: 'notes writing',
      icon: <Notebook {...iconProps} />,
      perform: () => push('/blog/notes'),
    },
    {
      id: 'leetcode',
      name: 'Leetcode',
      shortcut: ['l'],
      section: 'Blog',
      keywords: 'leetcode writing',
      icon: <TerminalWindow {...iconProps} />,
      perform: () => push('/blog/leetcode'),
    },
    {
      id: 'search-blog',
      name: 'Search blog...',
      section: 'Blog',
      keywords: 'search blog',
      shortcut: ['b', 's'],
      icon: <MagnifyingGlass {...iconProps} />,
    },
    ...postsAsAction,
    ...notesAsAction,
    ...leetcodeAsAction,
  ]

  const polyglotAsAction: Action[] = polyglotList.map((polyglot) => {
    const language = polyglot.tags[0].split('/')[0].toLowerCase()

    return {
      id: polyglot.slug,
      name: polyglot.title,
      icon: languageIcon[language as keyof typeof languageIcon],
      keywords: polyglot.tags.toString().replaceAll(',', ' '),
      parent: 'search-polyglot',
      section: 'Polyglot',
      perform: () => push(polyglot.url),
    }
  })

  const polyglotActions: Action[] = [
    {
      id: 'english',
      name: 'English',
      shortcut: ['e'],
      section: 'Polyglot',
      keywords: 'english writing',
      icon: languageIcon.english,
      perform: () => push('/polyglot/english'),
    },
    {
      id: 'german',
      name: 'German',
      shortcut: ['g'],
      section: 'Polyglot',
      keywords: 'german writing',
      icon: languageIcon.german,
      perform: () => push('/polyglot/german'),
    },
    {
      id: 'search-polyglot',
      name: 'Search polyglot...',
      section: 'Polyglot',
      keywords: 'search polyglot write writing',
      shortcut: ['p', 's'],
      icon: <MagnifyingGlass {...iconProps} />,
    },
    ...polyglotAsAction,
  ]

  const websiteActions: Action[] = [
    {
      id: 'link-friend',
      name: 'Friends',
      section: 'Website',
      keywords: 'friends',
      icon: <SnapchatLogo {...iconProps} />,
      perform: () => push('/friends'),
    },
    {
      id: 'link-repo',
      name: 'Github',
      section: 'Website',
      keywords: 'repo source github zero',
      icon: <GithubLogo {...iconProps} />,
      perform: () => window.open(config.links.repo, '_blank'),
    },
    {
      id: 'link-twitter',
      name: 'Twitter',
      section: 'Website',
      keywords: 'twitter personal homepage',
      icon: <XLogo {...iconProps} />,
      perform: () => window.open(config.links.twitter, '_blank'),
    },
    {
      id: 'link-linkedIn',
      name: 'LinkedIn',
      section: 'Website',
      keywords: 'linkedIn personal homepage',
      icon: <LinkedinLogo {...iconProps} />,
      perform: () => window.open(config.links.linkedIn, '_blank'),
    },
    {
      id: 'link-wakatime',
      name: 'Wakatime',
      section: 'Website',
      keywords: 'coding time analysis',
      icon: <Laptop {...iconProps} />,
      perform: () => window.open(config.links.wakatime, '_blank'),
    },
  ]

  const actions: Action[] = [
    ...navigationActions,
    ...blogActions,
    ...polyglotActions,
    ...websiteActions,
  ]

  return (
    <KBarProvider actions={actions}>
      <KBar />
      {children}
    </KBarProvider>
  )
}
