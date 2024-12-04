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
}

export default withContentCollections(nextConfig)
