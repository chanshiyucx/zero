import clsx from 'clsx'
import type { Metadata, Viewport } from 'next'
import { Fira_Code, Merriweather } from 'next/font/google'
import type { ReactNode } from 'react'
import { Command } from '@/components/layout/command'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Helper } from '@/components/ui/helper'
import { siteConfig } from '@/lib/constants/config'
import '@/styles/tailwindcss.css'
import { ThemeProvider } from 'next-themes'
import PageTransitionEffect from './effect'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
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
      data-scroll-behavior="smooth"
      className={clsx(merriweather.variable, fira.variable)}
    >
      <body>
        <ThemeProvider defaultTheme="light">
          <Header />
          <PageTransitionEffect>{children}</PageTransitionEffect>
          <Command />
          <Helper />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
