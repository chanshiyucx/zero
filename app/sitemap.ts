import { MetadataRoute } from 'next'
import { config } from '@/lib/constants/config'
import { sortedContent } from '@/lib/utils/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const list = sortedContent().map((item) => ({
    url: `${config.webserver.host}${item.url}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: config.webserver.host,
      lastModified: new Date(),
    },
    ...list,
  ]
}
