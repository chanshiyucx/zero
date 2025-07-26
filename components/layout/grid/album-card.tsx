import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

export function AlbumCard() {
  return (
    <Card tiltStrength={6}>
      <Link
        href={'/album'}
        className="dark:text-text relative block h-36 overflow-hidden rounded-lg text-base font-bold"
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
        <ArrowUpRightIcon
          weight="bold"
          size="1em"
          className="absolute top-2 right-2"
        />
      </Link>
    </Card>
  )
}
