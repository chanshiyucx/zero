import { env } from '@/env'

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

interface Cache<T> {
  data: T | null
  timestamp: number
}

interface CacheStructure {
  repositories: Cache<Repository[]>
  repository: Cache<Repository>
  user: Cache<User>
}

const GITHUB_API = 'https://api.github.com'
const USERNAME = 'chanshiyucx'
const REPO = 'zero'
const CACHE_TTL = 10 * 60 * 1000

const headers = new Headers({
  Authorization: `token ${env.GITHUB_TOKEN}`,
})

const cache: CacheStructure = {
  repositories: { data: null, timestamp: 0 },
  repository: { data: null, timestamp: 0 },
  user: { data: null, timestamp: 0 },
}

function getCache<Key extends keyof CacheStructure>(
  key: Key,
): CacheStructure[Key]['data'] | null {
  const now = Date.now()
  const { data, timestamp } = cache[key]
  const isValid = data && now - timestamp < CACHE_TTL
  return isValid ? data : null
}

function setCache<Key extends keyof CacheStructure>(
  key: Key,
  data: CacheStructure[Key]['data'],
): void {
  cache[key].data = data
  cache[key].timestamp = Date.now()
}

async function fetchWithCache<Key extends keyof CacheStructure>(
  url: string,
  cacheKey: Key,
): Promise<NonNullable<CacheStructure[Key]['data']>> {
  const cachedData = getCache(cacheKey)
  if (cachedData) return cachedData

  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`)
  }

  const data = await response.json()
  setCache(cacheKey, data)
  return data
}

export async function getGithubUserData() {
  const url = `${GITHUB_API}/users/${USERNAME}`
  return fetchWithCache<'user'>(url, 'user')
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
  return fetchWithCache<'repository'>(url, 'repository')
}
