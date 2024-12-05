import { env } from '@/env'
import { fetchWithCache, getCache, setCache } from './fetch'

export interface User {
  followers: number
  public_repos: number
}

export interface Repository {
  name: string
  full_name: string
  html_url: string
  description: string
  created_at: string
  updated_at: string
  homepage: string
  size: number
  stargazers_count: number
  language: string
  forks_count: number
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
  }
  topics: string[]
}

const GITHUB_API = 'https://api.github.com'
const USERNAME = 'chanshiyucx'
const REPO = 'zero'

const headers = new Headers({
  Authorization: `token ${env.GITHUB_TOKEN}`,
})

export async function getGithubUserData() {
  const url = `${GITHUB_API}/users/${USERNAME}`
  return fetchWithCache<'user'>(url, 'user', headers)
}

export async function getGithubRepositories() {
  const cacheKey = 'repositories'
  const cachedData = getCache(cacheKey)
  if (cachedData) return cachedData

  const { public_repos } = await getGithubUserData()
  const pages = Math.ceil(public_repos / 100)
  const repositories: Repository[] = []
  for (let index = 1; index <= pages; index++) {
    const response = await fetch(
      `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&page=${index}`,
      { headers },
    )
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const list: Repository[] = await response.json()
    repositories.push(...list)
  }
  setCache(cacheKey, repositories)
  return repositories
}

export async function getGithubRepo() {
  const url = `${GITHUB_API}/repos/${USERNAME}/${REPO}`
  return fetchWithCache<'repository'>(url, 'repository', headers)
}
