import fs from 'fs'
import path from 'path'
import { generateFeed, generateSitemap } from '@/lib/meta'

export function generateMeta() {
  console.log('🚀 Starting metadata generation...')
  const publicPath = path.join(process.cwd(), 'public')

  const feed = generateFeed()
  fs.writeFileSync(path.join(publicPath, 'feed.xml'), feed)
  console.log('✓ Feed Generated')

  const sitemap = generateSitemap()
  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap)
  console.log('✓ Sitemap Generated')

  console.log('✓ All metadata generated successfully.')
}

generateMeta()
