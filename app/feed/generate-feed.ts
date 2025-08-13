import { Feed } from 'feed'
import { siteConfig } from '@/lib/constants/config'
import { sortedContent } from '@/lib/utils/content'
import { markdownToHtml } from './markdown-to-html'

export async function generateFeed() {
  const list = sortedContent
  const date = new Date()
  const feed = new Feed({
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    id: siteConfig.webserver.host,
    link: siteConfig.webserver.host,
    favicon: `${siteConfig.webserver.host}/icon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Chanshiyu.`,
    updated: list.length > 0 ? new Date(list[0].date) : date,
    feedLinks: {
      rss2: `${siteConfig.webserver.host}/blog/feed`,
    },
    docs: siteConfig.links.repo,
    generator: 'Feed for Node.js',
    author: siteConfig.author,
  })

  await Promise.all(
    list.map(async (item) => {
      const link = `${siteConfig.webserver.host}${item.url}`
      const content = await markdownToHtml(item.content)

      feed.addItem({
        link,
        title: item.title,
        id: item.slug,
        description: item.description,
        content: content,
        author: [siteConfig.author],
        date: new Date(item.date),
        category: item.tags.map((tag) => ({ name: tag })),
      })
    }),
  )

  return feed.rss2()
}
