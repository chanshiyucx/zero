import type { Album, Leetcode, Post } from 'content-collections'
import {
  allAlbums,
  allLeetcodes,
  allNotes,
  allPosts,
} from 'content-collections'
import { compareDesc } from 'date-fns'

export type Content = Album | Leetcode | Post

function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return items.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
}

export function sortedPosts(): Post[] {
  return sortByDate(allPosts)
}

export function sortedNotes(): Post[] {
  return sortByDate(allNotes)
}

export function sortedLeetcodes(sortBy: 'id' | 'date' = 'id'): Leetcode[] {
  if (sortBy === 'id') {
    return allLeetcodes.sort((a, b) => Number(b.id) - Number(a.id))
  } else {
    return sortByDate(allLeetcodes)
  }
}

export function sortedAlbums(): Album[] {
  return sortByDate(allAlbums)
}

export function sortedContent(): Content[] {
  return sortByDate([...allPosts, ...allNotes, ...allLeetcodes])
}
