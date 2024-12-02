import { Github } from './Github'
import { Introduction } from './Introduction'

export function About() {
  return (
    <div className="flex flex-row gap-3">
      <Introduction />
      <Github />
    </div>
  )
}
