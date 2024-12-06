import type { NextConfig } from 'next'
import { withContentCollections } from '@content-collections/next'

const nextConfig: NextConfig = {
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
        destination: '/blog/feed',
      },
      {
        source: '/atom',
        destination: '/blog/feed',
      },
      {
        source: '/rss.xml',
        destination: '/blog/feed',
      },
      {
        source: '/atom.xml',
        destination: '/blog/feed',
      },
      {
        source: '/feed.xml',
        destination: '/blog/feed',
      },
    ]
  },
}

export default withContentCollections(nextConfig)
