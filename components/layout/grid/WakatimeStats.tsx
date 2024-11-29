import { Code } from '@phosphor-icons/react/dist/ssr'
import { VStudioCode } from '@/components/icons'
import { getCodingHrs } from '@/lib/waka-time'

export async function WakatimeStats() {
  const { seconds } = await getCodingHrs()

  return (
    <a
      href="https://wakatime.com/@Reverie"
      target="_blank"
      rel="noopener noreferrer"
      className="transform-gpu duration-500 hover:scale-95"
    >
      <div className="relative flex h-[4.125rem] flex-col items-center justify-center overflow-hidden rounded-lg bg-zinc-200 text-zinc-950">
        <VStudioCode className="absolute left-0 top-0 -rotate-45 text-[60px] brightness-75" />
        <span className="-rotate-2 items-center font-mono text-3xl font-semibold">
          <Code
            className="-mt-[0.15rem] mr-2 inline-block"
            size="20"
            weight="bold"
          />
          {Math.round(seconds / 3600)}h
        </span>
        <span className="text-sm">(coding stats)</span>
      </div>
    </a>
  )
}
