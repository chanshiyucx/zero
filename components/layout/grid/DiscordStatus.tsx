import { DiscordLogo } from '@phosphor-icons/react/dist/ssr'
import { getDiscordData } from '@/lib/request'

export async function DiscordStatus() {
  const { data } = await getDiscordData()

  return (
    <div className="flex h-36 w-fit items-center justify-center overflow-hidden rounded-lg p-2">
      <div className="relative flex -rotate-12 items-center justify-center">
        <DiscordLogo
          size="1em"
          className="absolute -bottom-8 -z-50 h-32 w-32 -rotate-45 text-muted/40"
        />

        <p className="flex flex-col text-xl font-semibold">
          <span>{data.discord_status}</span>
          <span className="text-sm">(@chanshiyucx)</span>
        </p>
      </div>
    </div>
  )
}
