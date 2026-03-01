import {
  allAlbums,
  allCrafts,
  allJournals,
  allMusings,
  type Album,
  type Craft,
  type Journal,
  type Musing,
} from 'content-collections'

export type Content = Album | Craft | Journal | Musing

export interface ContentGroup {
  year: number
  list: Content[]
}

const content: Content[] = [...allCrafts, ...allJournals]

const sortByDate = <T extends { date: string }>(items: readonly T[]): T[] =>
  [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

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

export const sortedCrafts: Craft[] = sortByDate(allCrafts)

export const sortedJournals: Journal[] = sortByDate(allJournals)

export const sortedMusings: Musing[] = sortByDate(allMusings)

export const sortedContent: Content[] = sortByDate(content)

export const findContentBySlug = (slug: string): Content | undefined =>
  content.find((c) => c.slug === slug)
