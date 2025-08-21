import { type Leetcode } from 'content-collections'
import { type Metadata } from 'next'
import { List, type ExtraInfo } from '@/components/ui/list'
import { groupByYear, sortedLeetcodes } from '@/lib/utils/content'

export const metadata: Metadata = {
  title: 'Leetcode',
  description:
    'A collection of my LeetCode solutions with explanations and optimizations, showcasing my approach to coding challenges.',
  keywords: ['blog', 'leetcode', 'code', 'programming'],
}

const colors = {
  Easy: 'text-foam',
  Medium: 'text-gold',
  Hard: 'text-love',
} as const

const extractInfo = (article: Leetcode): ExtraInfo => {
  const level = article.level!
  return {
    color: colors[level],
    text: level,
  }
}

const renderTitle = (article: Leetcode) => {
  return `${article.no} - ${article.title}`
}

export default function Page() {
  const leetcodeList = sortedLeetcodes
  const leetcodeGroupList = groupByYear(leetcodeList)

  return (
    <List
      title="Simplicity fuels ultimate efficiency."
      groups={leetcodeGroupList}
      extractInfo={extractInfo}
      renderTitle={renderTitle}
    />
  )
}
