import { GithubLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import catImg from '@/assets/images/cat.jpg'

export function GithubLink() {
  return (
    <a
      className="group relative flex h-full w-full transform-gpu flex-col justify-between gap-5 overflow-hidden rounded-lg text-base transition-all duration-500 will-change-[outline,_transform] group-hover:scale-[.97] hover:scale-[.97] active:scale-100"
      href="http://github.com/chanshiyucx"
      target="_blank"
    >
      <span className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src={catImg}
          alt="cat img"
          className="absolute inset-0 h-full w-full rounded-lg object-cover object-center brightness-75"
          priority
        />
      </span>
      <span className="px-6 pt-6">
        <span className="flex justify-between">
          <GithubLogo size="1em" className="text-xl" />
        </span>
      </span>
      <span className="space-y-0.5 px-6 pb-6">
        <span className="block font-semibold">GitHub</span>
        <span className="block text-sm">My experiments (aka projects)</span>
      </span>
    </a>
  )
}
