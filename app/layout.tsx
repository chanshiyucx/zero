import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import { Fira_Code, Source_Serif_4 } from 'next/font/google'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Helper } from '@/components/ui/helper'
import { siteConfig } from '@/lib/constants/config'
import '@/styles/tailwindcss.css'
import PageTransitionEffect from './effect'
import Providers from './providers'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-source-serif',
  display: 'swap',
})

const fira = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira',
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
  metadataBase: new URL(siteConfig.webserver.host),
  title: {
    default: siteConfig.metadata.title,
    template: `%s • ${siteConfig.metadata.title}`,
  },
  applicationName: siteConfig.metadata.title,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.link }],
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
    ...siteConfig.metadata,
    siteName: siteConfig.metadata.title,
    type: 'website',
    url: '/',
    emails: [siteConfig.author.email],
  },
  twitter: {
    ...siteConfig.metadata,
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
      className={clsx(sourceSerif.variable, fira.variable)}
    >
      <body>
        <Providers>
          <Header />
          <PageTransitionEffect>{children}</PageTransitionEffect>
          <Helper />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
