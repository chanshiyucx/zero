import type { NextConfig } from 'next'
import { withContentCollections } from '@content-collections/next'
import withBundleAnalyzer from '@next/bundle-analyzer'

let nextConfig: NextConfig = {
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

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer({
    enabled: true,
  })(nextConfig)
}

export default withContentCollections(nextConfig)
