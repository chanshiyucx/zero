import type { Action } from 'kbar'
import type { ReactNode } from 'react'
import {
  Camera,
  GitFork,
  GithubLogo,
  House,
  Laptop,
  LinkedinLogo,
  MagnifyingGlass,
  Notebook,
  Scroll,
  TerminalWindow,
  XLogo,
} from '@phosphor-icons/react/dist/ssr'
import { KBarProvider } from 'kbar'
import { useRouter } from 'next/navigation'
import { useData } from '@/app/context'
import { config } from '@/lib/config'
import { sortedLeetcodes, sortedPosts } from '@/lib/content'
import { KBar } from './Kbar'

export function CustomKBarProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter()
  const postList = sortedPosts()
  const leetcodeList = sortedLeetcodes()
  // const repositories: Repository[] = []
  const repositories = useData()

  const navigationActions: Action[] = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['n', 'h'],
      keywords: 'homepage main',
      icon: <House size="1em" weight="duotone" />,
      perform: () => push('/'),
    },
    {
      id: 'album',
      name: 'Album',
      shortcut: ['n', 'a'],
      keywords: 'a collection of moments and memories',
      icon: <Camera size="1em" weight="duotone" />,
      perform: () => push('/album'),
    },
  ]

  const postsAsAction: Action[] = postList.map((post) => ({
    id: post.slug,
    name: `${post.id}-${post.title}`,
    icon: <Notebook size="1em" weight="duotone" />,
    keywords: post.tags.toString().replaceAll(',', ' '),
    parent: 'search-blog',
    section: 'Blog',
    perform: () => push(post.url),
  }))

  const blogActions: Action[] = [
    {
      id: 'blog',
      name: 'Blog',
      shortcut: ['b'],
      section: 'Blog',
      keywords: 'posts writing',
      icon: <Scroll size="1em" weight="duotone" />,
      perform: () => push('/blog'),
    },
    {
      id: 'search-blog',
      name: 'Search blog...',
      section: 'Blog',
      keywords: 'search blog write writing blog',
      shortcut: ['b', 's'],
      icon: <MagnifyingGlass size="1em" weight="duotone" />,
    },
    ...postsAsAction,
  ]

  const leetcodeAsAction: Action[] = leetcodeList.map((leetcode) => ({
    id: leetcode.slug,
    name: `${leetcode.id}-${leetcode.title}`,
    icon: <Notebook size="1em" weight="duotone" />,
    keywords: leetcode.tags.toString().replaceAll(',', ' '),
    parent: 'search-leetcode',
    section: 'Leetcode',
    perform: () => push(leetcode.url),
  }))

  const leetcodeActions: Action[] = [
    {
      id: 'leetcode',
      name: 'Leetcode',
      shortcut: ['l'],
      section: 'Leetcode',
      keywords: 'leetcode writing',
      icon: <TerminalWindow size="1em" weight="duotone" />,
      perform: () => push('/leetcode'),
    },
    {
      id: 'search-leetcode',
      name: 'Search leetcode...',
      section: 'Leetcode',
      keywords: 'search leetcode write writing',
      shortcut: ['l', 's'],
      icon: <MagnifyingGlass size="1em" weight="duotone" />,
    },
    ...leetcodeAsAction,
  ]

  const projectsAsAction: Action[] = repositories.map((repo) => ({
    id: `out-${repo.full_name}`,
    name: repo.full_name,
    icon: <GitFork size="1em" weight="duotone" />,
    keywords: repo.topics.toString().replaceAll(',', ' '),
    parent: 'search-projects',
    section: 'Project',
    perform: () => push(repo.html_url),
  }))

  const projectsActions: Action[] = [
    {
      id: 'projects',
      name: 'Project',
      shortcut: ['p'],
      section: 'Project',
      keywords: 'projects writing',
      icon: <TerminalWindow size="1em" weight="duotone" />,
      perform: () => push('/projects'),
    },
    {
      id: 'search-projects',
      name: 'Search projects...',
      section: 'Project',
      keywords: 'search projects write writing',
      shortcut: ['p', 's'],
      icon: <MagnifyingGlass size="1em" weight="duotone" />,
    },
    ...projectsAsAction,
  ]

  const websiteActions: Action[] = [
    {
      id: 'out-repo',
      name: 'Github',
      section: 'Website',
      keywords: 'repo source github zero',
      icon: <GithubLogo size="1em" weight="duotone" />,
      perform: () => window.open(config.repo, '_blank'),
    },
    {
      id: 'out-twitter',
      name: 'Twitter',
      section: 'Website',
      keywords: 'twitter personal homepage',
      icon: <XLogo size="1em" weight="duotone" />,
      perform: () => window.open(config.twitter, '_blank'),
    },
    {
      id: 'out-linkedIn',
      name: 'LinkedIn',
      section: 'Website',
      keywords: 'linkedIn personal homepage',
      icon: <LinkedinLogo size="1em" weight="duotone" />,
      perform: () => window.open(config.linkedIn, '_blank'),
    },
    {
      id: 'out-wakatime',
      name: 'Wakatime',
      section: 'Website',
      keywords: 'coding time analysis',
      icon: <Laptop size="1em" weight="duotone" />,
      perform: () => window.open(config.wakatime, '_blank'),
    },
  ]

  const actions: Action[] = [
    ...navigationActions,
    ...leetcodeActions,
    ...blogActions,
    ...projectsActions,
    ...websiteActions,
  ]

  return (
    <KBarProvider actions={actions}>
      <KBar />
      {children}
    </KBarProvider>
  )
}
