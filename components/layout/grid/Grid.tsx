import { AlbumCard } from './AlbumCard'
import { DiscordStatus } from './DiscordStatus'
import { GithubLink } from './GithubLink'
import { GithubStats } from './GithubStats'
import { LatestPost } from './LatestPost'
import { SocialCard } from './SocialCard'
import { StacksCard } from './StacksCard'
import { StarsCard } from './StarsCard'
import { WakatimeStats } from './WakatimeStats'

export function Grid() {
  return (
    <div>
      <div className="grid grid-cols-6 gap-3 max-md:grid-cols-3">
        <div className="col-span-3">
          <GithubLink />
        </div>
        <div className="col-span-3">
          <GithubStats />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-6 gap-3 max-md:grid-cols-3">
        <div className="col-span-3 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="w-24">
              <AlbumCard />
            </div>
            <div className="flex w-full flex-col gap-2">
              <SocialCard />
              <WakatimeStats />
            </div>
          </div>
          <StacksCard />
        </div>

        <div className="col-span-3 flex flex-col gap-3">
          <div className="flex gap-2">
            <DiscordStatus />
            <LatestPost />
          </div>
          <StarsCard />
        </div>
      </div>
    </div>
  )
}
