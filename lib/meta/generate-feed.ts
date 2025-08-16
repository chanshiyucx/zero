import { Feed } from 'feed'
import { siteConfig } from '@/lib/constants/config'
import { sortedContent } from '@/lib/utils/content'

export function generateFeed() {
  const list = sortedContent
  const date = new Date()
  const feed = new Feed({
    id: siteConfig.host,
    link: siteConfig.host,
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    author: siteConfig.author,
    favicon: `${siteConfig.host}/icon.svg`,
    image: `${siteConfig.host}/icon.svg`,
    copyright: `All rights reserved ${date.getFullYear()}, Chanshiyu.`,
    updated: list.length > 0 ? new Date(list[0].date) : date,
    docs: siteConfig.links.repo,
    feedLinks: {
      rss2: `${siteConfig.host}/feed`,
    },
    generator: 'https://github.com/jpmonette/feed',
  })

  list.forEach((item) => {
    const link = `${siteConfig.host}${item.url}`
    feed.addItem({
      link,
      title: item.title,
      id: item.slug,
      description: item.description,
      content: item.contentHtml,
      author: [siteConfig.author],
      date: new Date(item.date),
      category: item.tags.map((tag) => ({ name: tag })),
    })
  })

  return feed.rss2()
}
