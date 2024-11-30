import { Quotes } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import books from '@/assets/images/books.jpg'

export function BookCard() {
  return (
    <Link href="/books">
      <div className="relative mt-3 h-[5.5rem] w-full transform-gpu overflow-hidden rounded-lg duration-500 hover:scale-95">
        <Image
          src={books}
          alt="Books"
          className="absolute bottom-0 left-0 right-0 top-0 -z-10 object-cover brightness-90"
        />
        <div className="text-md px-4 py-2 text-base font-bold">
          <Quotes className="rotate-180 text-xl" weight="bold" />
          <p className="text-xl">I lived in book than anywhere else.</p>
          <span className="flex justify-end">― Neil Gaiman</span>
        </div>
      </div>
    </Link>
  )
}
