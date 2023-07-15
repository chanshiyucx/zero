import { format } from 'timeago.js'
import { Issue, CustomIssue } from '@/type'

/**
 * 格式化文章
 */
const regex = /^(.+)?\r\n\s*(.+)?(\r\n)?/
const coverRegex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif|webp))/
export const formatIssue = (issue: Issue): Issue => {
  const { body, created_at } = issue
  const result = regex.exec(body)!
  const cover = coverRegex.exec(result[1])
  if (cover && cover.length === 3) {
    issue.description = result[2]
  } else {
    issue.description = result[1]
  }
  issue.created_at = format(created_at, 'zh_CN').replace(/\s/, '')
  return issue
}

/**
 * 格式化书单 & 友链
 */
export const formatPage = (data: Issue): CustomIssue[] => {
  if (!data || !data.body) return []
  const section = data.body.split('## ').filter((o) => o.length)
  const result = section.map((o) => {
    const content = o.split('\r\n').filter((o) => o.length)
    const item: CustomIssue = {}
    content.forEach((row, index) => {
      if (index === 0) {
        item.name = row
      } else {
        const inx = row.indexOf(':')
        const key = row.slice(0, inx).trim()
        const value = row.slice(inx + 1).trim()
        item[key] = value
      }
    })
    return item
  })

  return result
}
