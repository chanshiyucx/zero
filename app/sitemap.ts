import { MetadataRoute } from 'next'
import { sortedContent } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const list = sortedContent().map((item) => ({
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
