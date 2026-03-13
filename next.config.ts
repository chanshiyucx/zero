import { withContentCollections } from '@content-collections/next'

export default withContentCollections({
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cx-onedrive.pages.dev',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/rss',
        destination: '/feed',
      },
      {
        source: '/rss.xml',
        destination: '/feed',
      },
      {
        source: '/feed.xml',
        destination: '/feed',
      },
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
      },
    ]
  },
})
