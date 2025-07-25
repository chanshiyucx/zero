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

type SortableContent = { date: string }
type SortableByNo = { no: string }

const sortByDate = <T extends SortableContent>(items: T[]): T[] =>
  [...items].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

const sortByNo = <T extends SortableByNo>(items: T[]): T[] =>
  [...items].sort((a, b) => Number(b.no) - Number(a.no))

export const sortedPosts = (): Post[] => sortByDate(allPosts)

export const sortedNotes = (): Note[] => sortByDate(allNotes)

export const sortedLeetcodes = (sortBy: 'no' | 'date' = 'date'): Leetcode[] =>
  sortBy === 'no' ? sortByNo(allLeetcodes) : sortByDate(allLeetcodes)

export const sortedContent = (): Content[] =>
  sortByDate([...allPosts, ...allNotes, ...allLeetcodes, ...allPolyglots])

export const groupByYear = (items: Content[]): ContentGroup[] => {
  const contentGroup: ContentGroup[] = []
  items.forEach((post) => {
    const year = getYear(post.date)
    const lastGroup = contentGroup.at(-1)
    if (!lastGroup || lastGroup.year !== year) {
      contentGroup.push({ year, list: [] })
    }
    contentGroup.at(-1)?.list.push(post)
  })
  return contentGroup
}

export const summary = (): BlogSummary => {
  const posts = allPosts.length
  const notes = allNotes.length
  const leetcodes = allLeetcodes.length
  return { posts, notes, leetcodes }
}

export const sortedPolyglots = (
  filterByLanguage?: 'english' | 'german',
): Polyglot[] => {
  let filteredList = allPolyglots
  if (filterByLanguage) {
    filteredList = allPolyglots.filter((polyglot) =>
      polyglot.tags[0].toLowerCase().startsWith(filterByLanguage),
    )
  }
  return sortByDate(filteredList)
}

export const sortedAlbums = (): Album[] => sortByDate(allAlbums)
