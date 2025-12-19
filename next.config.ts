import { withContentCollections } from '@content-collections/next'
import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

let nextConfig: NextConfig = {
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
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer({
    enabled: true,
  })(nextConfig)
}

export default withContentCollections(nextConfig)
