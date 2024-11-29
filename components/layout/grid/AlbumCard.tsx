import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import beach from '@/assets/ablum/beach.jpg'

export function AlbumCard() {
  return (
    <Link href={'/album'}>
      <div className="relative h-36 transform-gpu rounded-lg text-zinc-50 duration-500 hover:scale-95">
        <Image
          className="absolute inset-0 h-full w-full rounded-lg object-cover object-center brightness-75"
          src={beach}
          alt="album beach"
          priority={false}
        />
        <p className="absolute -left-2 bottom-16 top-8 w-40 -rotate-90 font-bold">
          たびのきおく
        </p>
        <ArrowUpRight
          weight="bold"
          size="1em"
          className="absolute right-2 top-2"
        />
      </div>
    </Link>
  )
}
