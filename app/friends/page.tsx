import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageLayout } from '@/components/layout/page'
import { friends, type Friend } from '@/lib/constants/friends'

export const metadata: Metadata = {
  title: 'Friend',
  description:
    'Friendship is a journey of shared moments, memories, and emotions that enrich our lives.',
  keywords: ['friend', 'friendship', 'connection', 'memories'],
}

function FriendCard({ friend }: { friend: Friend }) {
  const avatar = `/friends/${friend.name.toLowerCase()}.jpg`
  return (
    <Link
      href={friend.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-40 flex-col items-center justify-center rounded-lg border-dashed text-center duration-300 hover:border-2"
    >
      <Image
        src={avatar}
        alt={friend.name}
        width={64}
        height={64}
        className="ring-overlay rounded-lg ring-2 duration-300 group-hover:translate-y-7 group-hover:scale-110 group-hover:opacity-60"
      />
      <p className="group-hover:text-shadow pt-3 pb-1 text-lg font-bold duration-300 group-hover:-translate-y-7 group-hover:-rotate-6 group-hover:text-2xl">
        {friend.name}
      </p>
      <p className="text-subtle line-clamp-2 text-sm text-balance break-all duration-300 group-hover:opacity-80">
        {friend.description}
      </p>
    </Link>
  )
}

export default function Page() {
  return (
    <PageLayout title="Souls connected through time.">
      <section>
        <ul className="slide-auto grid grid-cols-3 gap-3 max-md:grid-cols-2">
          {friends.map((friend) => (
            <li key={friend.name}>
              <FriendCard friend={friend} />
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  )
}
