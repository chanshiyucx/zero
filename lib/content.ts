import type { Album, Leetcode, Post } from 'content-collections'
import {
  allAlbums,
  allLeetcodes,
  allNotes,
  allPosts,
} from 'content-collections'
import { compareDesc } from 'date-fns'

export type Content = Album | Leetcode | Post

export function sortedPosts(): Post[] {
  return allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
}

export function sortedNotes(): Post[] {
  return allNotes.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
}

export function sortedLeetcodes(sortBy: 'id' | 'date' = 'id'): Leetcode[] {
  if (sortBy === 'date') {
    return allLeetcodes.sort((a, b) => Number(b.id) - Number(a.id))
  } else {
    return allLeetcodes.sort((a, b) =>
      compareDesc(new Date(a.date), new Date(b.date)),
    )
  }
}

export function sortedAlbums(): Album[] {
  return allAlbums.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
}

export function sortedContent(): (Album | Leetcode | Post)[] {
  return [...allPosts, ...allNotes, ...allLeetcodes].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
}
