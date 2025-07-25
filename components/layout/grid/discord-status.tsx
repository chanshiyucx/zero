import { DiscordLogoIcon } from '@phosphor-icons/react/dist/ssr'
import { getDiscordData } from '@/lib/api'

export async function DiscordStatus() {
  const { data } = await getDiscordData()

  return (
    <div className="flex h-36 w-fit items-center justify-center overflow-hidden rounded-lg p-2">
      <div className="relative flex -rotate-12 items-center justify-center">
        <DiscordLogoIcon
          size="1em"
          className="text-overlay absolute -bottom-8 -z-10 h-32 w-32 -rotate-45 brightness-95 dark:brightness-110"
        />

        <p className="flex flex-col text-xl font-semibold">
          <span>{data.discord_status}</span>
          <span className="text-sm">(@chanshiyucx)</span>
        </p>
      </div>
    </div>
  )
}
