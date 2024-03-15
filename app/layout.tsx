import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Noto_Serif_SC } from 'next/font/google'
import 'aos/dist/aos.css'
// import Header from '@/components/Header'
import Nya from '@/components/Nya'
import '@/styles/index.css'

const serif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-serif',
})

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
  viewport:
    'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className={serif.variable}>
      <head>
        <Nya />
      </head>
      <body>
        {/* <Header /> */}
        {children}
      </body>
    </html>
  )
}
