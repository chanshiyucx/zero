export type Cloud = {
  nums: number
  cityid: string
  city: string
  date: string
  week: string
  update_time: string
  wea: string
  wea_img: 'xue' | 'lei' | 'shachen' | 'wu' | 'bingbao' | 'yun' | 'yu' | 'yin' | 'qing'
  tem: string
  tem_day: string
  tem_night: string
  win: string
  win_speed: string
  win_meter: string
  air: string
  pressure: string
  humidity: string
}

export type Label = {
  id: number
  url: string
  name: string
  description: string
  color: string
}

export type Milestone = {
  id: number
  number: number
  url: string
  title: string
  description: string
  open_issues: number
  updated_at: string
}

export type Issue = {
  id: number
  number: number
  url: string
  title: string
  body: string
  description: string
  created_at: string
  updated_at: string
  milestone: Milestone
  labels: Label[]
}

export type QueryParams = {
  page: number
  pageSize?: number
  state: 'open' | 'closed'
  filter?: string
}

export type IssueLabel = 'About' | 'Friend' | 'Book' | 'Project'

export type CustomIssue = {
  [key: string]: any
}

export type Hot = {
  [key: number]: number
}

export type ThemeType = 'Hutao' | 'Keqing' | 'Ganyu' | 'Beelzebul' | 'Ayaka' | 'Yoimiya' | 'Kokomi' | 'Nahida'

export type Theme = {
  type: ThemeType
  name: string
  color: string
  image: string
}
