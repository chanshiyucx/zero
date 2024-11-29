import { AlbumCard } from './AlbumCard'
import { GithubLink } from './GithubLink'
import { GithubStats } from './GithubStats'
import { SocialCard } from './SocialCard'
import { WakatimeStats } from './WakatimeStats'

export function Grid() {
  return (
    <div>
      <div className="mt-8 grid grid-cols-6 gap-3">
        <div className="col-span-3">
          <GithubLink />
        </div>
        <div className="col-span-3">
          <GithubStats />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 md:grid-cols-6">
        <div className="col-span-3 flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="w-24">
              <AlbumCard />
            </div>
            <div className="flex w-full flex-col gap-3">
              <SocialCard />
              <WakatimeStats />
            </div>
          </div>
          <div className="cols-span-3">{/* <StacksCard /> */}</div>
        </div>

        {/* <div className="col-span-3 space-y-3 md:ml-3">
          <div className="flex gap-3">
            <DiscordStatus />

            <LatestPost />
          </div>
          <BooksCard />
        </div> */}
      </div>
    </div>
  )
}
