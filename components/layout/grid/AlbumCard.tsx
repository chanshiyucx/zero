import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import beach from '@/assets/images/beach.jpg'

export function AlbumCard() {
  return (
    <Link
      href={'/album'}
      className="card-sm relative block h-36 text-base font-bold"
    >
      <Image
        className="absolute inset-0 h-full w-full rounded-lg object-cover object-center brightness-75"
        src={beach}
        alt="Album Beach"
        priority={false}
      />
      <p className="absolute -left-2 bottom-16 top-8 w-40 -rotate-90">
        たびのきおく
      </p>
      <ArrowUpRight
        weight="bold"
        size="1em"
        className="absolute right-2 top-2"
      />
    </Link>
  )
}
