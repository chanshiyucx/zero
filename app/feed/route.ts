import { generateFeed } from './generate-feed'

export const revalidate = 3600

export async function GET() {
  const feed = await generateFeed()

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
