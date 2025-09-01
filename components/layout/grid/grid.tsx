import { Heatmap } from '@/components/ui/heatmap'
import { AlbumCard } from './album-card'
import { AnalysisCard } from './analysis-card'
import { CatCard } from './cat-card'
import { DiscordStatus } from './discord-status'
import { GithubStats } from './github-stats'
import { LatestStats } from './latest-stats'
import { SocialCard } from './social-card'
import { StacksCard } from './stacks-card'
import { WakatimeStats } from './wakatime-stats'

export function Grid() {
  let staggerIndex = 0
  return (
    <div className="space-y-3">
      <div style={{ '--stagger': staggerIndex++ }}>
        <Heatmap />
      </div>
      <div
        style={{ '--stagger': staggerIndex++ }}
        className="grid grid-cols-6 gap-3 max-md:grid-cols-3"
      >
        <div className="col-span-3">
          <CatCard />
        </div>
        <div className="col-span-3">
          <GithubStats />
        </div>
      </div>
      <div
        style={{ '--stagger': staggerIndex++ }}
        className="grid grid-cols-6 gap-3 max-md:grid-cols-3"
      >
        <div className="col-span-3 flex gap-2">
          <div className="w-24">
            <AlbumCard />
          </div>
          <div className="flex w-full flex-col gap-2">
            <SocialCard />
            <WakatimeStats />
          </div>
        </div>
        <div className="col-span-3 flex gap-2">
          <DiscordStatus />
          <LatestStats />
        </div>
      </div>
      <div
        style={{ '--stagger': staggerIndex++ }}
        className="grid grid-cols-6 gap-3 max-md:grid-cols-3"
      >
        <div className="col-span-3">
          <AnalysisCard />
        </div>
        <div className="col-span-3">
          <StacksCard />
        </div>
      </div>
    </div>
  )
}
