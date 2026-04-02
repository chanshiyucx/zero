import { readFile } from 'node:fs/promises'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { Signature } from '@/components/icons'
import { siteConfig } from '@/lib/constants/config'
import { findContentBySlug } from '@/lib/utils/content'

const fontDataPromise = readFile(
  new URL('../../../public/assets/merriweather.ttf', import.meta.url),
).then((buffer) =>
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const content = findContentBySlug(decodedSlug)
  const title = content?.title ?? siteConfig.metadata.role

  const fontData = await fontDataPromise

  try {
    return new ImageResponse(
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '20px 40px',
          backgroundImage: 'linear-gradient(to bottom right, #f6c177, #eb6f92)',
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
          <Signature stroke="#b4637a" fill="#ea9d34" strokeWidth="3px" />
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
      </div>,
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
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
        },
      },
    )
  } catch (error: unknown) {
    console.error(`Failed to generate OG image: ${(error as Error).message}`)
    return new Response(`Failed to generate OG image`, {
      status: 500,
    })
  }
}
