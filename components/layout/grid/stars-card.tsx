import Image from 'next/image'
import Link from 'next/link'

export function StarsCard() {
  return (
    <Link
      href="/leetcode"
      className="relative block h-full w-full overflow-hidden rounded-lg"
    >
      <Image
        src="/assets/stars.jpg"
        alt="Stars"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </Link>
  )
}
