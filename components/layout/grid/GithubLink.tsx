import { GithubLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import { config } from '@/lib/constants/config'

export function GithubLink() {
  return (
    <a
      href={config.links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="card relative block h-full w-full"
    >
      <Image
        src="/assets/cat.jpg"
        alt="Cat"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="-z-10 brightness-50"
      />
      <div className="flex h-full flex-col justify-between gap-5 p-6 text-base font-bold">
        <GithubLogo className="text-xl" weight="bold" />
        <span className="flex flex-col space-y-0.5">
          <span>GitHub</span>
          <span className="text-sm">My experiments (aka projects)</span>
        </span>
      </div>
    </a>
  )
}
