import Image from 'next/image'
import { Nav } from './nav'

export function Footer() {
  return (
    <footer className="mt-auto mb-6 flex items-center justify-between gap-1 text-sm">
      <div className="flex gap-1">
        <Image src="/icon.svg" alt="Shiyu" width={14} height={14} />
        <p>
          Shiyu
          <span className="ml-1 inline-block translate-y-0.5">&copy; </span>
          2016-2026
        </p>
      </div>

      <Nav />
    </footer>
  )
}
