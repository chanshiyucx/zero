import { siteConfig } from '@/lib/constants/config'
import { sortedContent } from '@/lib/utils/content'

export function generateSitemap() {
  const list = sortedContent.map(
    (item) => `
    <url>
      <loc>${siteConfig.webserver.host}${item.url}</loc>
      <lastmod>${new Date(item.date).toISOString()}</lastmod>
    </url>
  `,
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.webserver.host}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  ${list.join('')}
</urlset>
`

  return sitemap
}
