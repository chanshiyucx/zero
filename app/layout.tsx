import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Cloud from '@/components/Cloud'
import { PhotoProvider } from '@/components/PhotoView'
import Side from '@/components/Side'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const photoViewConfig = {
  maskOpacity: 0.5,
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
    <html lang="zh-CN" className={inter.variable}>
      <body className={inter.className}>
        <Cloud />
        <Side />
        <PhotoProvider {...photoViewConfig}>{children}</PhotoProvider>
      </body>
    </html>
  )
}
