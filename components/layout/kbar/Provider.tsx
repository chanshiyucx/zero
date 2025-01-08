import type { Repository } from '@/lib/api'
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
import { KBarProvider, useRegisterActions } from 'kbar'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { config } from '@/lib/constants/config'
import { sortedLeetcodes, sortedNotes, sortedPosts } from '@/lib/utils/content'
import { KBar } from './Kbar'

const iconProps: Partial<IconProps> = {
  size: '1em',
  weight: 'duotone',
  className: 'inline-block text-xl mr-3',
}

function RegisterActions() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('/api/github/repositories')
        const data = await response.json()
        setRepositories(data)
      } catch (error) {
        console.error('Failed to load repositories:', error)
      }
    }
    fetchRepositories()
  }, [])

  const projectsAsAction: Action[] = useMemo(() => {
    const actions: Action[] = repositories.map((repo) => ({
      id: `link-${repo.full_name}`,
      name: repo.full_name,
      icon: <Briefcase {...iconProps} />,
      keywords: repo.topics.toString().replaceAll(',', ' '),
      parent: 'search-projects',
      section: 'Projects',
      perform: () => window.open(repo.html_url, '_blank'),
    }))
    return [
      {
        id: 'search-projects',
        name: 'Search projects...',
        section: 'Projects',
        keywords: 'search projects write writing',
        shortcut: ['p', 's'],
        icon: <MagnifyingGlass {...iconProps} />,
      },
      ...actions,
    ]
  }, [repositories])

  useRegisterActions(projectsAsAction, [projectsAsAction])

  return null
}

export function CustomKBarProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter()
  const postList = sortedPosts()
  const noteList = sortedNotes()
  const leetcodeList = sortedLeetcodes()

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
      id: 'album',
      name: 'Album',
      shortcut: ['n', 'a'],
      keywords: 'a collection of moments and memories',
      icon: <Camera {...iconProps} />,
      perform: () => push('/album'),
    },
  ]

  const postsAsAction: Action[] = postList.map((post) => ({
    id: post.slug,
    name: `${post.id}-${post.title}`,
    icon: <Scroll {...iconProps} />,
    keywords: post.tags.toString().replaceAll(',', ' '),
    parent: 'search-blog',
    section: 'Blog',
    perform: () => push(post.url),
  }))
  const notesAsAction: Action[] = noteList.map((note) => ({
    id: note.slug,
    name: `${note.id}-${note.title}`,
    icon: <Notebook {...iconProps} />,
    keywords: note.tags.toString().replaceAll(',', ' '),
    parent: 'search-blog',
    section: 'Blog',
    perform: () => push(note.url),
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
      id: 'search-blog',
      name: 'Search posts and notes...',
      section: 'Blog',
      keywords: 'search blog posts notes',
      shortcut: ['b', 's'],
      icon: <MagnifyingGlass {...iconProps} />,
    },
    ...postsAsAction,
    ...notesAsAction,
  ]

  const leetcodeAsAction: Action[] = leetcodeList.map((leetcode) => ({
    id: leetcode.slug,
    name: `${leetcode.id}-${leetcode.title}`,
    icon: <TerminalWindow {...iconProps} />,
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
      icon: <TerminalWindow {...iconProps} />,
      perform: () => push('/leetcode'),
    },
    {
      id: 'search-leetcode',
      name: 'Search leetcode...',
      section: 'Leetcode',
      keywords: 'search leetcode write writing',
      shortcut: ['l', 's'],
      icon: <MagnifyingGlass {...iconProps} />,
    },
    ...leetcodeAsAction,
  ]

  const projectsActions: Action[] = [
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['p'],
      section: 'Projects',
      keywords: 'projects writing',
      icon: <Briefcase {...iconProps} />,
      perform: () => push('/projects'),
    },
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
    ...leetcodeActions,
    ...projectsActions,
    ...websiteActions,
  ]

  return (
    <KBarProvider actions={actions}>
      <KBar />
      <RegisterActions />
      {children}
    </KBarProvider>
  )
}
