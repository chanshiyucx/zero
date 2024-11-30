import type { Post } from 'content-collections'
import { allPosts } from 'content-collections'
import { compareDesc } from 'date-fns'

export function sortedPosts(): Post[] {
  return allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
}
