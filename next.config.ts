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
        destination: '/feed',
      },
      {
        source: '/atom',
        destination: '/feed',
      },
      {
        source: '/rss.xml',
        destination: '/feed',
      },
      {
        source: '/atom.xml',
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
