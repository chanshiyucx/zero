import type { Leetcode, Post } from 'content-collections'
import { allLeetcodes, allPosts } from 'content-collections'
import { compareDesc } from 'date-fns'

export function sortedPosts(): Post[] {
  return allPosts.sort((a, b) =>
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
