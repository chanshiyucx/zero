import { Code } from '@phosphor-icons/react/dist/ssr'
import { VStudioCode } from '@/components/icons'
import { config } from '@/lib/config'
import { getCodingHrs } from '@/lib/waka-time'

export async function WakatimeStats() {
  const { seconds } = await getCodingHrs()

  return (
    <a
      href={config.wakatime}
      target="_blank"
      rel="noopener noreferrer"
      className="transform-gpu duration-500 hover:scale-95"
    >
      <div className="relative flex h-[4.125rem] flex-col items-center justify-center overflow-hidden rounded-lg bg-surface">
        <VStudioCode className="absolute left-3 top-3 -rotate-45 text-[50px]" />
        <span className="-rotate-2 items-center font-mono text-3xl font-semibold">
          <Code
            className="-mt-[0.15rem] mr-2 inline-block text-xl"
            weight="bold"
          />
          {Math.round(seconds / 3600)}h
        </span>
        <span className="text-sm">(coding stats)</span>
      </div>
    </a>
  )
}
