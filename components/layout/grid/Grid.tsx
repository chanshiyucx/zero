import { AlbumCard } from './album-card'
import { AnalysisCard } from './analysis-card'
import { CatCard } from './cat-card'
import { DiscordStatus } from './discord-status'
import { GithubStats } from './github-stats'
import { LatestStats } from './latest-stats'
import { SocialCard } from './social-card'
import { StacksCard } from './stacks-card'
import { WakatimeStats } from './wakatime-stats'

// import { StarsCard } from './stars-card'

export function Grid() {
  return (
    <div>
      <div className="grid grid-cols-6 gap-3 max-md:grid-cols-3">
        <div className="col-span-3">
          <CatCard />
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
          <AnalysisCard />
        </div>

        <div className="col-span-3 flex flex-col gap-3">
          <div className="flex gap-2">
            <DiscordStatus />
            <LatestStats />
          </div>
          <StacksCard />
        </div>
      </div>
    </div>
  )
}
