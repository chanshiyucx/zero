export interface User {
  followers: number
  public_repos: number
}

export interface Commit {
  total_count: number
}

export interface Follower {
  login: string
  avatar_url: string
  html_url: string
}

export interface Repository {
  language?: string
  stargazers_count: number
  fork: boolean
}

export interface ContributionDay {
  contributionCount: number
  date: string
  shortDate: string
}

export interface Week {
  contributionDays: ContributionDay[]
}
