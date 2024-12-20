import type { Album, Leetcode, Note, Post } from 'content-collections'
import {
  allAlbums,
  allLeetcodes,
  allNotes,
  allPosts,
} from 'content-collections'
import { compareDesc } from 'date-fns'

export type Content = Post | Note | Leetcode

type SortableContent = { date: string }
type SortableById = { id: string }

const sortByDate = <T extends SortableContent>(items: T[]): T[] =>
  [...items].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

const sortById = <T extends SortableById>(items: T[]): T[] =>
  [...items].sort((a, b) => Number(b.id) - Number(a.id))

export const sortedPosts = (): Post[] => sortByDate(allPosts)

export const sortedNotes = (): Post[] => sortByDate(allNotes)

export const sortedAlbums = (): Album[] => sortByDate(allAlbums)

export const sortedLeetcodes = (sortBy: 'id' | 'date' = 'id'): Leetcode[] =>
  sortBy === 'id' ? sortById(allLeetcodes) : sortByDate(allLeetcodes)

export const sortedContent = (): Content[] =>
  sortByDate([...allPosts, ...allNotes, ...allLeetcodes])
