import { Introduction } from './introduction'

// import { MakingCard } from './making-card'

export function About() {
  return (
    <div className="flex flex-row gap-3">
      <Introduction />
      <div className="relative">
        <div className="sticky top-24 h-fit w-[23rem]">
          {/* <MakingCard /> */}
        </div>
      </div>
    </div>
  )
}
