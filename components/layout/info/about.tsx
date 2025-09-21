import { HandWavingIcon } from '@phosphor-icons/react/dist/ssr'
import { Logo } from '@/components/ui/logo'

export function About() {
  return (
    <div className="prose prose-rosepine slide-auto w-full max-w-none">
      <div className="flex flex-row items-end gap-6 max-md:flex-col max-md:items-start max-md:gap-0">
        <div className="max-md:self-center">
          <Logo />
        </div>

        <div>
          <h2 className="text-subtle text-xs">
            Full-Stack Developer / Budding Photographer
          </h2>

          <p className="mb-0">
            <HandWavingIcon weight="duotone" className="mr-1 inline text-xl" />
            <span>Hello, I&apos;m Shiyu. A smol nerd with big dreams.</span>
          </p>
        </div>
      </div>
      <p>
        <i>Crafting interfaces.</i> Designing elegant software and immersive web
        worlds. Growing through creation, following curiosity without apology,
        weaving intention into every detail.
      </p>
    </div>
  )
}
