import type { LucideIcon } from 'lucide-react'

export type Theme = 'light' | 'dark'

export interface Contact {
  icon: LucideIcon
  href: string
  target: string
  rel: string
}
