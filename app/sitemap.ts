import { allLeetcodes, allNotes, allPosts } from 'content-collections'
import { compareDesc } from 'date-fns'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const list = [...allPosts, ...allNotes, ...allLeetcodes]
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .map((item) => ({
      url: `https://chanshiyu.com${item.url}`,
      lastModified: new Date(),
    }))

  return [
    {
      url: 'https://chanshiyu.com',
      lastModified: new Date(),
    },
    ...list,
  ]
}
