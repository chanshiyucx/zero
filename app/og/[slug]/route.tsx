import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { Signature } from '@/components/icons'
import { siteConfig } from '@/lib/constants/config'
import { getAbsoluteUrl, host } from '@/lib/utils/edge'

export const runtime = 'edge'

export const revalidate = false

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  const metaApiUrl = getAbsoluteUrl(`/api/content?slug=${slug}`)
  const response = await fetch(metaApiUrl)
  if (!response.ok) {
    return new Response('Failed to fetch article metadata', { status: 500 })
  }
  const meta: { title: string } | null = await response.json()
  const title = meta?.title ?? siteConfig.metadata.title

  const fontData = await fetch(new URL('/assets/merriweather.ttf', host)).then(
    (res) => res.arrayBuffer(),
  )

  try {
    return new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '20px',
            backgroundImage:
              'linear-gradient(to bottom right, #f6c177, #eb6f92)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '50px',
              paddingBottom: '70px',
            }}
          >
            <Signature stroke="#b4637a" fill="#ea9d34" />
          </div>
          <div
            style={{
              color: 'white',
              fontSize: '72px',
              lineHeight: 1.2,
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              letterSpacing: -2,
              fontWeight: 700,
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Merriweather',
            data: fontData,
            style: 'italic',
            weight: 700,
          },
        ],
      },
    )
  } catch (error: unknown) {
    console.error(`Failed to generate OG image: ${(error as Error).message}`)
    return new Response(`Failed to generate OG image`, {
      status: 500,
    })
  }
}
