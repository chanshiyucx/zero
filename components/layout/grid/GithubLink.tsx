import { GithubLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import catImg from '@/assets/images/cat.jpg'
import { config } from '@/lib/config'

export function GithubLink() {
  return (
    <a
      href={config.links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="card relative block h-full w-full"
    >
      <Image
        src={catImg}
        alt="Cat"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center brightness-50"
        priority={false}
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
