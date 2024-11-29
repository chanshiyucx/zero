import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Helper } from '@/components/modules/helper'
import { Nya } from '@/components/modules/nya'
import { env } from '@/env'
import Providers from './providers'
import '@/styles/main.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const config = {
  metadata: {
    title: "Reverie's Hideout",
    description:
      'My internet hideout, here you will find some topics that I am learning and building, thoughts and tech blog posts, and know more about who I am...',
  },
  webserver: {
    host: env.HOST ?? 'http://localhost:3000',
  },
}

export const metadata: Metadata = {
  ...config.metadata,
  metadataBase: new URL(config.webserver.host),
  title: {
    default: config.metadata.title,
    template: `%s • ${config.metadata.title}`,
  },
  applicationName: config.metadata.title,
  authors: [{ name: 'Reverie', url: 'https://github.com/chanshiyucx' }],
  category: 'Personal Website',
  keywords: 'Blog, Code, ACG, Web, Zero, Programming, Knowledge',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    ...config.metadata,
    siteName: config.metadata.title,
    type: 'website',
    url: '/',
    emails: ['chanshiyucx@gmail.com'],
  },
  twitter: {
    ...config.metadata,
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Nya />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Helper />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
