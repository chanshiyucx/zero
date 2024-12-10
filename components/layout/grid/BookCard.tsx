import Image from 'next/image'
import Link from 'next/link'
import stars from '@/assets/images/stars.jpg'

export function BookCard() {
  return (
    <Link href="/leetcode" className="card relative block h-full w-full">
      <Image
        src={stars}
        alt="Stars"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
    </Link>
  )
}
