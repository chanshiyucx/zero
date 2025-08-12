import {
  allAlbums,
  allLeetcodes,
  allNotes,
  allPolyglots,
  allPosts,
  type Album,
  type Leetcode,
  type Note,
  type Polyglot,
  type Post,
} from 'content-collections'
import { compareDesc, getYear } from 'date-fns'

export type Content = Post | Note | Leetcode | Polyglot

export type ContentType = 'Post' | 'Note' | 'Leetcode' | 'Polyglot'

export interface ContentGroup {
  year: number
  list: Content[]
}

export interface BlogSummary {
  posts: number
  notes: number
  leetcodes: number
}

export const content: Content[] = [
  ...allPosts,
  ...allNotes,
  ...allLeetcodes,
  ...allPolyglots,
]

const sortByDate = <T extends { date: string }>(items: readonly T[]): T[] =>
  [...items].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

const sortedByPriority = <T extends { priority: number }>(
  items: readonly T[],
): T[] =>
  [...items]
    .filter((a) => a.priority > 0)
    .sort((a, b) => b.priority - a.priority)

const filterByLanguage = <T extends { tags?: readonly string[] }>(
  items: readonly T[],
  language: 'english' | 'german',
): T[] =>
  [...items].filter((a) =>
    a.tags?.some((tag) => tag.toLowerCase().startsWith(language)),
  )

export const groupByYear = (items: Content[]): ContentGroup[] => {
  const groups: Record<number, Content[]> = {}

  items.forEach((item) => {
    const year = getYear(item.date)
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

export const sortedPosts: Post[] = sortByDate(allPosts)

export const sortedNotes: Note[] = sortByDate(allNotes)

export const sortedLeetcodes: Leetcode[] = sortByDate(allLeetcodes)

export const sortedPolyglots: Polyglot[] = sortByDate(allPolyglots)

export const sortedPolyglotsEnglish: Polyglot[] = filterByLanguage(
  sortedPolyglots,
  'english',
)

export const sortedPolyglotsGerman: Polyglot[] = filterByLanguage(
  sortedPolyglots,
  'german',
)
export const sortedContent: Content[] = sortByDate(content)

export const sortedPriorityContent: Content[] = sortedByPriority(content)

export const summary: BlogSummary = {
  posts: allPosts.length,
  notes: allNotes.length,
  leetcodes: allLeetcodes.length,
}
