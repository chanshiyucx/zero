import { generateFeed } from '@/lib/meta/generate-feed'

export const dynamic = 'force-static'

export function GET() {
  const feed = generateFeed()

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
