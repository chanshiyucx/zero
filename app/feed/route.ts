import { generateFeed } from './generate-feed'

export async function GET() {
  const feed = generateFeed()

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
