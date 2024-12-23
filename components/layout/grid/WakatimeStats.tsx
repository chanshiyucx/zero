import { Code } from '@phosphor-icons/react/dist/ssr'
import { VStudioCode } from '@/components/icons'
import { getCodingHrs } from '@/lib/api'
import { config } from '@/lib/constants/config'

export async function WakatimeStats() {
  const result = await getCodingHrs()
  const { total_seconds } = result.data

  return (
    <a
      href={config.links.wakatime}
      target="_blank"
      rel="noopener noreferrer"
      className="card-sm relative flex h-[4.125rem] flex-col items-center justify-center bg-rose text-base dark:bg-rose/75"
    >
      <VStudioCode className="absolute left-3 top-3 -rotate-45 text-5xl" />
      <span className="-rotate-2 items-center font-mono text-3xl font-semibold">
        <Code className="mr-2 inline-block text-xl" weight="bold" />
        {Math.round(total_seconds / 3600)}h
      </span>
      <span className="text-sm">(coding stats)</span>
    </a>
  )
}
