import { MetadataRoute } from 'next'
import { config } from '@/lib/constants/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${config.webserver.host}/sitemap.xml`,
  }
}
