import Image from 'next/image'
import Link from 'next/link'

export function StarsCard() {
  return (
    <Link href="/leetcode" className="card relative block h-full w-full">
      <Image
        src="/assets/stars.jpg"
        alt="Stars"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </Link>
  )
}
