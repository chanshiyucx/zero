import { Feed } from 'feed'
import { siteConfig } from '@/lib/constants/config'
import { sortedContent } from '@/lib/utils/content'
import { markdownToHtml } from './markdown-to-html'

export function generateFeed() {
  const date = new Date()
  const list = sortedContent()
  const feed = new Feed({
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    id: siteConfig.webserver.host,
    link: siteConfig.webserver.host,
    favicon: `${siteConfig.webserver.host}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Chanshiyu.`,
    updated: list.length > 0 ? new Date(list[0].date) : date,
    feedLinks: {
      rss2: `${siteConfig.webserver.host}/blog/feed`,
    },
    docs: siteConfig.links.repo,
    generator: 'Feed for Node.js',
    author: siteConfig.author,
  })

  list.forEach((item) => {
    const link = `${siteConfig.webserver.host}${item.url}`
    feed.addItem({
      link,
      title: item.title,
      id: item.slug,
      description: item.description,
      content: markdownToHtml(item.content),
      author: [siteConfig.author],
      date: new Date(item.date),
      category: item.tags.map((tag) => ({ name: tag })),
    })
  })

  return feed.rss2()
}
