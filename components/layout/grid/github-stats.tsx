import { Card } from '@/components/ui/card'
import { Contribution } from '@/components/ui/contribution'
import { siteConfig } from '@/lib/constants/config'

export function GithubStats() {
  return (
    <Card>
      <a
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-surface border-box block h-36 overflow-hidden rounded-lg p-1"
      >
        <Contribution />
      </a>
    </Card>
  )
}
