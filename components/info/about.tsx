import { HandWavingIcon } from '@phosphor-icons/react/dist/ssr'
import { Logo } from '@/components/logo'
import { Nav } from './nav'
import { WorldClock } from './world-clock'

export function About() {
  return (
    <div data-slide-auto className="prose prose-rosepine w-full max-w-none">
      <div className="flex flex-row items-end gap-6 max-md:flex-col max-md:items-start max-md:gap-0">
        <div className="max-md:self-center">
          <Logo />
        </div>

        <div>
          <h2 className="text-subtle text-xs">
            Full-Stack Developer / Budding Photographer
          </h2>

          <p className="mb-0">
            <HandWavingIcon
              weight="duotone"
              size={18}
              className="mr-1 inline"
            />
            <span>Ciao, I&apos;m Shiyu. A curious soul with big dreams.</span>
          </p>
        </div>
      </div>

      <p>
        Living in Munich, Germany. It is currently <WorldClock /> here.
        Somewhere between code and quiet, finding moments of stillness in a
        noisy world.
      </p>

      <p>
        <i>Seize the day, gather ye rosebuds while ye may. </i> Dreaming deeply,
        coding endlessly, stumbling over German, chasing light through
        photography.
      </p>

      <Nav />
    </div>
  )
}
