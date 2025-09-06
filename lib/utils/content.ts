import {
  allAlbums,
  allLeetcodes,
  allPolyglots,
  allPosts,
  allSnippets,
  allVibes,
  type Album,
  type Leetcode,
  type Polyglot,
  type Post,
  type Snippet,
  type Vibe,
} from 'content-collections'
import dayjs from 'dayjs'

export type Content = Post | Snippet | Leetcode | Polyglot

export interface ContentGroup {
  year: number
  list: Content[]
}

export interface BlogSummary {
  posts: number
  snippets: number
  leetcodes: number
}

export const content: Content[] = [
  ...allPosts,
  ...allSnippets,
  ...allLeetcodes,
  ...allPolyglots,
]

const sortByDate = <T extends { date: string }>(items: readonly T[]): T[] =>
  [...items].sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))

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

export const sortedPosts: Post[] = sortByDate(allPosts)

export const sortedSnippets: Snippet[] = sortByDate(allSnippets)

export const sortedVibes: Vibe[] = sortByDate(allVibes)

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
  snippets: allSnippets.length,
  leetcodes: allLeetcodes.length,
}

export const findContentBySlug = (slug: string): Content | undefined =>
  content.find((c) => c.slug === slug)

const formatDateWithoutTime = (date: string) => date.split(' ')[0]

// Heatmap Data
export interface HeatmapData {
  title: string
  url: string
  type: 'post' | 'snippet' | 'leetcode' | 'english' | 'german'
}

const getHeatmapData = () => {
  const data = sortedContent.reduce((map, currentContent) => {
    const key = formatDateWithoutTime(currentContent.date)
    if (!map.has(key)) {
      map.set(key, [])
    }

    const type = (
      currentContent.type === 'polyglot'
        ? currentContent.tags[0].split('/')[0]
        : currentContent.type
    ).toLowerCase() as HeatmapData['type']

    const data: HeatmapData = {
      title: currentContent.title,
      url: currentContent.url,
      type,
    }
    map.get(key)?.push(data)
    return map
  }, new Map<string, HeatmapData[]>())

  return {
    data,
    startDate: formatDateWithoutTime(
      sortedContent[sortedContent.length - 1].date,
    ),
    endDate: formatDateWithoutTime(sortedContent[0].date),
  }
}

export const heatmapData = getHeatmapData()
