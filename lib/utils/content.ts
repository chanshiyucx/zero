import {
  allAlbums,
  allArticles,
  allJournals,
  allMusings,
  allSnippets,
  type Album,
  type Article,
  type Journal,
  type Musing,
  type Snippet,
} from 'content-collections'

export type Content = Album | Article | Journal | Musing | Snippet

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
  [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

const sortedByPriority = <T extends { priority: number }>(
  items: readonly T[],
): T[] => [...items].sort((a, b) => b.priority - a.priority)

export const groupByYear = (items: Content[]): ContentGroup[] => {
  const groups: Record<number, Content[]> = {}

  items.forEach((item) => {
    const year = new Date(item.date).getFullYear()
    groups[year] ??= []
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

export const sortedMusings: Musing[] = sortByDate(allMusings)

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
