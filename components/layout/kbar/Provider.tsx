import {
  // Notebook,
  // Book,
  // MagnifyingGlass,
  // Moon,
  // Note,
  // Palette,
  // PencilSimpleLine,
  // Rss,
  // Sun,
  // Tag,
  // TreeStructure,
  // ChartLine,
  Camera,
  // SquaresFour,
  // Files,
  // Books,
  // ChartPieSlice,
  // Article,
  // Briefcase,
  // Code,
  // Desktop,
  // File,
  // FileDashed,
  // FolderOpen,
  // Folder,
  // GithubLogo,
  House,
} from '@phosphor-icons/react/dist/ssr'
import { Action, KBarProvider } from 'kbar'
// import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { KBar } from './Kbar'

// import { getSortedPosts } from '~/lib/get-sorted-posts'
// import { KBar } from '~/components/kbar'
// import { slug } from '~/lib/slug'
// import { getUniqueCategoryList } from '~/lib/categories'
// import { getUniqueTagList } from '~/lib/tags'
// import { posts, projects, tils } from '#content'

export function CustomKBarProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter()
  // const { setTheme } = useTheme()

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

  // const projectsAsActions: Action[] = projects.map(project => ({
  //   id: `out-${project.slug}`,
  //   name: project.title,
  //   subtitle: project.description,
  //   keywords: [...project.tags, project.core_techs].toString(),
  //   section: 'Projects',
  //   icon: <SquaresFour size="1em" weight="duotone" />,
  //   parent: 'search-projects',
  //   get perform() {
  //     if (project.website) return () => window.open(project.website, '_blank')
  //     if (project.repository)
  //       return () => window.open(project.repository, '_blank')

  //     return undefined
  //   }
  // }))
  // const projectsActions: Action[] = [
  //   {
  //     id: 'projects',
  //     name: 'Projects',
  //     shortcut: ['p'],
  //     section: 'Projects',
  //     keywords: 'works projects tools apps',
  //     icon: <Briefcase size="1em" weight="duotone" />,
  //     perform: () => push('/projects')
  //   },
  //   {
  //     id: 'search-projects',
  //     name: 'Search project...',
  //     shortcut: ['p', 's'],
  //     section: 'Projects',
  //     keywords: 'works projects tools apps',
  //     icon: <MagnifyingGlass size="1em" weight="duotone" />
  //   },
  //   ...projectsAsActions
  // ]

  // const categoriesAsAction: Action[] = getUniqueCategoryList()
  //   .sort()
  //   .map(category => ({
  //     id: slug(category),
  //     name: category,
  //     icon: <Folder size="1em" weight="duotone" />,
  //     parent: 'categories',
  //     section: 'Blog',
  //     perform: () => push(`/blog/categories/${slug(category)}`)
  //   }))
  // const tagsAsAction: Action[] = getUniqueTagList()
  //   .sort()
  //   .map(tag => ({
  //     id: slug(tag),
  //     name: tag,
  //     icon: <Tag size="1em" weight="duotone" />,
  //     parent: 'tags',
  //     section: 'Blog',
  //     perform: () => push(`/blog/tag/${slug(tag)}`)
  //   }))

  // const getIconByStatus = (status: 'published' | 'draft' | 'planned') => {
  //   if (status === 'published') return <Article size="1em" weight="duotone" />
  //   if (status === 'draft') return <FileDashed size="1em" weight="duotone" />
  //   if (status === 'planned')
  //     return <PencilSimpleLine size="1em" weight="duotone" />
  // }
  // const postsAsAction: Action[] = getSortedPosts(
  //   posts.filter(post => post.status !== 'planned')
  // ).map(({ slug, title, status, test, tags, description }) => ({
  //   id: slug,
  //   name: title,
  //   icon: test ? <Code size="1em" weight="duotone" /> : getIconByStatus(status),
  //   keywords: tags.toString().replaceAll(',', ' '),
  //   parent: 'search-posts',
  //   subtitle: description,
  //   section: 'Blog',
  //   perform: () => push(`/blog/post/${slug}`)
  // }))
  // const tilsAsAction: Action[] = tils.map(til => ({
  //   id: til.slug,
  //   name: til.title,
  //   icon: <Notebook size="1em" weight="duotone" />,
  //   keywords: til.tags.toString().replaceAll(',', ' '),
  //   parent: 'search-posts',
  //   subtitle: til.description,
  //   section: 'Blog',
  //   perform: () => push(`/blog/til#${slug(til.title)}`)
  // }))

  // const blogActions: Action[] = [
  //   {
  //     id: 'blog',
  //     name: 'Blog',
  //     shortcut: ['b'],
  //     section: 'Blog',
  //     keywords: 'posts writing',
  //     icon: <Note size="1em" weight="duotone" />,
  //     perform: () => push('/blog')
  //   },
  //   {
  //     id: 'til',
  //     name: 'Today I Learned',
  //     shortcut: ['b', 'i'],
  //     section: 'Blog',
  //     keywords: 'writing learning progress skills',
  //     icon: <Notebook size="1em" weight="duotone" />,
  //     perform: () => push('/blog/til')
  //   },
  //   {
  //     id: 'categories',
  //     name: 'Categories',
  //     shortcut: ['b', 'c'],
  //     section: 'Blog',
  //     keywords: 'posts writing',
  //     icon: <FolderOpen size="1em" weight="duotone" />
  //   },
  //   ...categoriesAsAction,
  //   {
  //     id: 'tags',
  //     name: 'Tags',
  //     shortcut: ['b', 't'],
  //     section: 'Blog',
  //     keywords: 'posts writing',
  //     icon: <Tag size="1em" weight="duotone" />
  //   },
  //   ...tagsAsAction,
  //   {
  //     id: 'rss',
  //     name: 'Rss',
  //     section: 'Blog',
  //     keywords: 'feed rss atom',
  //     icon: <Rss size="1em" weight="duotone" />,
  //     perform: () => push('/blog/feed')
  //   },
  //   {
  //     id: 'search-posts',
  //     name: 'Search posts...',
  //     section: 'Blog',
  //     keywords: 'search posts write writing blog',
  //     shortcut: ['b', 's'],
  //     icon: <MagnifyingGlass size="1em" weight="duotone" />
  //   },
  //   ...postsAsAction,
  //   ...tilsAsAction
  // ]

  // const personalLinksActions: Action[] = [
  //   {
  //     id: 'out-dotfiles',
  //     name: 'My Manjaro Dotfiles',
  //     section: 'Personal Links',
  //     keywords: 'linux config setup',
  //     icon: <Files size="1em" weight="duotone" />,
  //     perform: () =>
  //       window.open('https://github.com/mateusfg7/dotfiles', '_blank')
  //   },
  //   {
  //     id: 'out-bookshelf',
  //     name: 'My Bookshelf',
  //     section: 'Personal Links',
  //     keywords: 'books library',
  //     icon: <Books size="1em" weight="duotone" />,
  //     perform: () =>
  //       window.open(
  //         'https://www.skoob.com.br/estante/livros/todos/8289961',
  //         '_blank'
  //       )
  //   }
  // ]
  // const websiteInformationActions: Action[] = [
  //   {
  //     id: 'out-repo',
  //     name: 'Source code',
  //     section: 'Website',
  //     keywords: 'repo source github código fonte',
  //     icon: <GithubLogo size="1em" weight="duotone" />,
  //     perform: () =>
  //       window.open('https://github.com/mateusfg7/mateusf.com', '_blank')
  //   },
  //   {
  //     id: 'out-license',
  //     name: 'License',
  //     section: 'Website',
  //     keywords: 'mit gpl',
  //     icon: <File size="1em" weight="duotone" />,
  //     perform: () =>
  //       window.open(
  //         'https://github.com/mateusfg7/mateusf.com/blob/main/LICENSE',
  //         '_blank'
  //       )
  //   },
  //   {
  //     id: 'out-analytics',
  //     name: 'Analytics',
  //     section: 'Website',
  //     keywords: 'stats graph traffic',
  //     icon: <ChartLine size="1em" weight="duotone" />,
  //     perform: () =>
  //       window.open(
  //         "https://analytics.mateusf.com/share/YdWCDBOWOyKv5rRe/Mateus%20Felipe's%20Hideout",
  //         '_blank'
  //       )
  //   },
  //   {
  //     id: 'sitemap',
  //     name: 'Sitemap',
  //     section: 'Website',
  //     keywords: 'map links crawler',
  //     icon: <TreeStructure size="1em" weight="duotone" />,
  //     perform: () => push('/sitemap')
  //   }
  // ]

  // const themeActions: Action[] = [
  //   {
  //     id: 'set-theme',
  //     name: 'Change theme',
  //     icon: <Palette size="1em" weight="duotone" />,
  //     keywords: 'theme dark light',
  //     shortcut: ['c', 't'],
  //     section: 'Configurations'
  //   },
  //   {
  //     id: 'system-theme',
  //     name: 'System colors',
  //     icon: <Desktop size="1em" weight="duotone" />,
  //     parent: 'set-theme',
  //     keywords: 'theme dark light',
  //     perform: () => setTheme('system')
  //   },
  //   {
  //     id: 'dark-theme',
  //     name: 'Dark mode',
  //     icon: <Moon size="1em" weight="duotone" />,
  //     parent: 'set-theme',
  //     keywords: 'theme dark light',
  //     perform: () => setTheme('dark')
  //   },
  //   {
  //     id: 'light-theme',
  //     name: 'Light mode',
  //     icon: <Sun size="1em" weight="duotone" />,
  //     parent: 'set-theme',
  //     keywords: 'theme dark light',
  //     perform: () => setTheme('light')
  //   }
  // ]

  const actions: Action[] = [
    ...navigationActions,
    // ...blogActions,
    // ...projectsActions,
    // ...personalLinksActions,
    // ...websiteInformationActions,
    // ...themeActions
  ]

  return (
    <KBarProvider actions={actions}>
      <KBar />
      {children}
    </KBarProvider>
  )
}
