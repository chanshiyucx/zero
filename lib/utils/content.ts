import {
  allAlbums,
  allArticles,
  allJournals,
  allSnippets,
  type Album,
  type Article,
  type Journal,
  type Snippet,
} from 'content-collections'
import dayjs from 'dayjs'

export type Content = Article | Snippet | Journal

export interface ContentGroup {
  year: number
  list: Content[]
}

export interface BlogSummary {
  articles: number
  snippets: number
  journals: number
}

export const content: Content[] = [
  ...allArticles,
  ...allSnippets,
  ...allJournals,
]

const sortByDate = <T extends { date: string }>(items: readonly T[]): T[] =>
  [...items].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))

const sortedByPriority = <T extends { priority: number }>(
  items: readonly T[],
): T[] => [...items].sort((a, b) => b.priority - a.priority)

export const groupByYear = (items: Content[]): ContentGroup[] => {
  const groups: Record<number, Content[]> = {}

  items.forEach((item) => {
    const year = dayjs(item.date).year()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(item)
  })

  return Object.entries(groups)
    .map(([year, list]) => ({
      year: Number(year),
      list,
    }))
    .sort((a, b) => b.year - a.year)
}

export const sortedAlbums: Album[] = sortByDate(allAlbums)

export const sortedArticles: Article[] = sortByDate(allArticles)

export const sortedJournals: Journal[] = sortByDate(allJournals)

export const sortedSnippets: Snippet[] = sortByDate(allSnippets)

export const sortedContent: Content[] = sortByDate(content)

export const sortedPriorityContent: Content[] = sortedByPriority(sortedContent)

export const summary: BlogSummary = {
  articles: allArticles.length,
  snippets: allSnippets.length,
  journals: allJournals.length,
}

export const findContentBySlug = (slug: string): Content | undefined =>
  content.find((c) => c.slug === slug)
