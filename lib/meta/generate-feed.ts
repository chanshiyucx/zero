import { Feed } from 'feed'
import { siteConfig } from '@/lib/constants/config'
import { getMdxToHtmlProcessor } from '@/lib/mdx'
import { sortedContent } from '@/lib/utils/content'

export async function generateFeed() {
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
    updated: list[0] ? new Date(list[0].date) : date,
    docs: siteConfig.links.repo,
    feedLinks: {
      rss2: `${siteConfig.host}/feed`,
    },
    generator: 'https://github.com/jpmonette/feed',
  })

  await Promise.all(
    list.map(async (item) => {
      const link = `${siteConfig.host}${item.url}`
      const content = await getMdxToHtmlProcessor(item.type).process(
        item.content,
      )
      feed.addItem({
        link,
        title: item.title,
        id: item.slug,
        description: item.description,
        content: String(content),
        author: [siteConfig.author],
        date: new Date(item.date),
        category: item.tags.map((tag) => ({ name: tag })),
      })
    }),
  )

  return feed.rss2()
}
