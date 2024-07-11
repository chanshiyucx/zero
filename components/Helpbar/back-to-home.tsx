'use client'

import { House } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import TinyButton from './tiny-button'

export default function BackToHome() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  const backToHome = () => router.push('/')

  return (
    <TinyButton className={isHomePage ? 'hidden' : ''} onClick={backToHome}>
      <House size={18} />
    </TinyButton>
  )
}
