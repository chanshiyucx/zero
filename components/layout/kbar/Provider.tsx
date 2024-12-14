import type { Repository } from '@/lib/api'
import type { IconProps } from '@phosphor-icons/react/dist/lib/types'
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
import { KBarProvider, useRegisterActions } from 'kbar'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { config } from '@/lib/constants/config'
import { sortedLeetcodes, sortedPosts } from '@/lib/utils/content'
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
      icon: <GitFork {...iconProps} />,
      keywords: repo.topics.toString().replaceAll(',', ' '),
      parent: 'search-projects',
      section: 'Project',
      perform: () => window.open(repo.html_url, '_blank'),
    }))
    return [
      {
        id: 'search-projects',
        name: 'Search projects...',
        section: 'Project',
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
    icon: <Notebook {...iconProps} />,
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
      icon: <Scroll {...iconProps} />,
      perform: () => push('/blog'),
    },
    {
      id: 'search-blog',
      name: 'Search blog...',
      section: 'Blog',
      keywords: 'search blog write writing blog',
      shortcut: ['b', 's'],
      icon: <MagnifyingGlass {...iconProps} />,
    },
    ...postsAsAction,
  ]

  const leetcodeAsAction: Action[] = leetcodeList.map((leetcode) => ({
    id: leetcode.slug,
    name: `${leetcode.id}-${leetcode.title}`,
    icon: <Notebook {...iconProps} />,
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
      name: 'Project',
      shortcut: ['p'],
      section: 'Project',
      keywords: 'projects writing',
      icon: <TerminalWindow {...iconProps} />,
      perform: () => push('/projects'),
    },
  ]

  const websiteActions: Action[] = [
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
    ...leetcodeActions,
    ...blogActions,
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
