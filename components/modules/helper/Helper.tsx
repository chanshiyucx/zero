import { ScrollTop } from './ScrollTop'

export function Helper() {
  return (
    <section>
      <ul className="fixed right-0 z-10 flex gap-6 shadow-sm transition-transform max-md:top-0 max-md:w-full max-md:justify-center max-md:bg-zinc-50/85 max-md:py-6 max-md:backdrop-blur-sm md:bottom-6 md:right-6 md:flex-col md:gap-2 dark:max-md:bg-zinc-700/85">
        <ScrollTop />
      </ul>
    </section>
  )
}