import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Anton, Courier_Prime, Noto_Serif } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Helpbar from '@/components/Helpbar'
import Nya from '@/components/Nya'
import Providers from './providers'
import '@/styles/index.css'

const serif = Noto_Serif({
  subsets: ['latin'],
  weight: ['500', '600', '700', '900'],
  display: 'swap',
  variable: '--font-serif',
})

const courier = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-courier',
})

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-anton',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: '蝉時雨',
  description: '蝉鸣如雨 花宵道中',
  authors: [{ name: '蝉時雨', url: 'https://chanshiyu.com' }],
  keywords: 'Code, ACG, Zero, 蝉時雨',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${serif.variable} ${courier.variable} ${anton.variable}`}
    >
      <head>
        <Nya />
      </head>
      <body>
        <Header />
        <Providers>
          {children}
          <Helpbar />
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
