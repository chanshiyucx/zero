import { type Metadata, type Viewport } from 'next'
import { JetBrains_Mono, Merriweather } from 'next/font/google'
import { type ReactNode } from 'react'
import { Footer } from '@/components/footer'
import { Helper } from '@/components/helper'
import { siteConfig } from '@/lib/constants/config'
import { cn } from '@/lib/utils/style'
import '@/styles/tailwindcss.css'
import { ThemeProvider } from 'next-themes'
import MotionProvider from './providers/motion-provider'
import VercelProvider from './providers/vercel-provider'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#232136' },
    { media: '(prefers-color-scheme: light)', color: '#faf4ed' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  ...siteConfig.metadata,
  metadataBase: new URL(siteConfig.host),
  title: {
    default: siteConfig.metadata.title,
    template: `%s • ${siteConfig.metadata.title}`,
  },
  applicationName: siteConfig.metadata.title,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.link }],
  category: 'Personal Website',
  keywords: 'Blog, Code, ACG, Web, Zero, Programming, Knowledge',
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    ...siteConfig.metadata,
    siteName: siteConfig.metadata.title,
    type: 'website',
    url: '/',
    emails: [siteConfig.author.email],
    images: [
      {
        url: '/og/home',
        width: 1200,
        height: 630,
        alt: siteConfig.metadata.title,
      },
    ],
  },
  twitter: {
    ...siteConfig.metadata,
    creator: siteConfig.author.name,
    images: ['/og/home'],
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(merriweather.variable, jetbrainsMono.variable)}
    >
      <body>
        <ThemeProvider defaultTheme="system" enableSystem>
          <MotionProvider>
            <VercelProvider>
              {children}
              <Helper />
              <Footer />
            </VercelProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
