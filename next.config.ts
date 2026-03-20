import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cx-onedrive.pages.dev',
        pathname: '/**',
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
}

export default withContentCollections(nextConfig)
