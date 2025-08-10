import { CodeIcon } from '@phosphor-icons/react/dist/ssr'
import { Cursor } from '@/components/icons'
import { Card } from '@/components/ui/card'
import { getCodingHrs } from '@/lib/api/waka-time'
import { siteConfig } from '@/lib/constants/config'

export async function WakatimeStats() {
  const result = await getCodingHrs()
  const { total_seconds } = result.data

  return (
    <Card tiltStrength={6}>
      <a
        href={siteConfig.links.wakatime}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-rose dark:bg-rose/75 relative flex h-[4.125rem] flex-col items-center justify-center overflow-hidden rounded-lg text-base"
      >
        <Cursor className="absolute top-2 left-3 -rotate-45 animate-spin text-5xl opacity-80 duration-10000" />
        <span className="inline-flex -rotate-2 items-center gap-1 font-mono text-3xl font-semibold">
          <CodeIcon className="mr-2 inline-block text-xl" weight="bold" />
          {Math.round(total_seconds / 3600)}h
        </span>
        <span className="text-sm">(coding stats)</span>
      </a>
    </Card>
  )
}
