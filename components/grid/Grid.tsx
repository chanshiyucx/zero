import { GithubLink } from './GithubLink'
import { GithubStats } from './GithubStats'

export function Grid() {
  return (
    <div>
      <div className="mt-8 grid grid-cols-6 gap-3">
        <div className="col-span-3">
          <GithubLink />
        </div>
        <div className="col-span-3">
          <GithubStats />
        </div>
        {/*   <MostListenedMusic /> */}
      </div>
    </div>
  )
}
