import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

export function AlbumCard() {
  return (
    <Link
      href={'/album'}
      className="card-sm relative block h-36 text-base font-bold"
    >
      <Image
        src="/assets/beach.jpg"
        alt="Album Beach"
        fill
        sizes="(max-width: 768px) 100vw, 20vw"
        className="rounded-lg brightness-75"
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
