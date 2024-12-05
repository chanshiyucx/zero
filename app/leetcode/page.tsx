import { Date } from '@/components/ui/date'
import { sortedLeetcodes } from '@/lib/content'

export default function Page() {
  const leetcodeList = sortedLeetcodes()

  return (
    <article className="page space-y-20">
      <header>
        <h1 className="text-4xl font-extrabold">
          Simplicity is the soul of efficiency.
        </h1>
      </header>
      <div>
        <ul className="space-y-2">
          {leetcodeList.map((leetcode) => (
            <li key={leetcode.title} className="text-lg">
              <a className="flex gap-6" href={leetcode.url}>
                <Date
                  dateString={leetcode.date}
                  className="w-16 text-subtle"
                ></Date>
                <span className="tiny-thumb w-12 text-center text-sm">
                  {leetcode.id}
                </span>
                <span>{leetcode.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
