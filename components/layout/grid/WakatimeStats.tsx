import { CodeIcon } from '@phosphor-icons/react/dist/ssr'
import { VStudioCode } from '@/components/icons'
import { getCodingHrs } from '@/lib/api'
import { siteConfig } from '@/lib/constants/config'

export async function WakatimeStats() {
  const result = await getCodingHrs()
  const { total_seconds } = result.data

  return (
    <a
      href={siteConfig.links.wakatime}
      target="_blank"
      rel="noopener noreferrer"
      className="card-sm bg-rose dark:bg-rose/75 relative flex h-[4.125rem] flex-col items-center justify-center text-base"
    >
      <VStudioCode className="absolute top-3 left-3 -rotate-45 text-5xl opacity-80" />
      <span className="-rotate-2 items-center font-mono text-3xl font-semibold">
        <CodeIcon className="mr-2 inline-block text-xl" weight="bold" />
        {Math.round(total_seconds / 3600)}h
      </span>
      <span className="text-sm">(coding stats)</span>
    </a>
  )
}
