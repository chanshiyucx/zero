import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants/config'
import { sortedContent } from '@/lib/utils/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const list = sortedContent().map((item) => ({
    url: `${siteConfig.webserver.host}${item.url}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: siteConfig.webserver.host,
      lastModified: new Date(),
    },
    ...list,
  ]
}
