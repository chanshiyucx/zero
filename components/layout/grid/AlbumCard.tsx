import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

export function AlbumCard() {
  return (
    <Link
      href={'/album'}
      className="card-sm dark:text-text relative block h-36 text-base font-bold"
    >
      <Image
        src="/assets/beach.jpg"
        alt="Album Beach"
        fill
        sizes="(max-width: 768px) 100vw, 20vw"
        className="rounded-lg brightness-75"
      />
      <p className="absolute top-8 bottom-16 -left-2 w-40 -rotate-90">
        たびのきおく
      </p>
      <ArrowUpRight
        weight="bold"
        size="1em"
        className="absolute top-2 right-2"
      />
    </Link>
  )
}
