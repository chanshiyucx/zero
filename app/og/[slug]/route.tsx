import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { siteConfig } from '@/lib/constants/config'

// import { findContentBySlug } from '@/lib/utils/content'

const getAbsoluteUrl = (path: string) => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
  return `${baseUrl}${path}`
}

export const runtime = 'edge'

export const revalidate = 86400 // 24 hours

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  // const article = findContentBySlug(decodedSlug)
  // const title = article?.title ?? siteConfig.metadata.title
  const title = decodedSlug ?? siteConfig.metadata.title
  const encodedTitle = encodeURIComponent(title)

  const googleFontsCss = await fetch(
    `https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@1,18..144,700&text=${encodedTitle}`,
  ).then((res) => res.text())

  const fontUrlMatch = googleFontsCss.match(
    /src: url\((.+)\) format\('truetype'\)/,
  )

  if (!fontUrlMatch) {
    throw new Error('Could not find font URL in Google Fonts CSS response.')
  }

  const fontUrl = fontUrlMatch[1]
  const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer())

  const signatureSvgUrl = getAbsoluteUrl('/assets/signature.svg')

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={signatureSvgUrl}
              width="412"
              height="228"
              alt="Signature"
            />
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
