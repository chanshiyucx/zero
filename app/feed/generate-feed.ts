import { Feed } from 'feed'
import { config } from '@/lib/config'
import { sortedContent } from '@/lib/content'
import { markdownToHtml } from './markdown-to-html'

export function generateFeed() {
  const date = new Date()
  const list = sortedContent()
  const feed = new Feed({
    title: config.metadata.title,
    description: config.metadata.description,
    id: config.webserver.host,
    link: config.webserver.host,
    favicon: `${config.webserver.host}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Reverie.`,
    updated: list.length > 0 ? new Date(list[0].date) : date,
    feedLinks: {
      rss2: `${config.webserver.host}/blog/feed`,
    },
    docs: config.links.repo,
    generator: 'Feed for Node.js',
    author: config.author,
  })

  list.forEach((item) => {
    const link = `${config.webserver.host}${item.url}`
    feed.addItem({
      link,
      title: item.title,
      id: item.slug,
      description: item.description,
      content: markdownToHtml(item.content),
      author: [config.author],
      date: new Date(item.date),
      category: item.tags.map((tag) => ({ name: tag })),
    })
  })

  return feed.rss2()
}
