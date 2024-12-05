import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Helper } from '@/components/ui/helper'
import { env } from '@/env'
import Providers from './providers'
import '@/styles/main.css'
import { config } from '@/lib/config'
import { getGithubRepositories } from '@/lib/github'
import { DataProvider } from './context'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const defaultConfig = {
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
  ...defaultConfig.metadata,
  metadataBase: new URL(defaultConfig.webserver.host),
  title: {
    default: defaultConfig.metadata.title,
    template: `%s • ${defaultConfig.metadata.title}`,
  },
  applicationName: defaultConfig.metadata.title,
  authors: [{ name: 'Reverie', url: config.github }],
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
    ...defaultConfig.metadata,
    siteName: defaultConfig.metadata.title,
    type: 'website',
    url: '/',
    emails: ['chanshiyucx@gmail.com'],
  },
  twitter: {
    ...defaultConfig.metadata,
    card: 'summary_large_image',
  },
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const repositories = await getGithubRepositories()

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DataProvider repositories={repositories}>
          <Providers>
            <Header />
            {children}
            <Helper />
            <Footer />
          </Providers>
        </DataProvider>
      </body>
    </html>
  )
}
