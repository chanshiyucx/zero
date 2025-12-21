import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants/config'
import { sortedContent } from '@/lib/utils/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const contentRoutes = sortedContent.map((item) => ({
    url: `${siteConfig.host}${item.url}`,
    lastModified: new Date(item.date),
  }))

  const routes = [
    {
      url: siteConfig.host,
      lastModified: new Date(),
    },
    ...contentRoutes,
  ]

  return routes
}
