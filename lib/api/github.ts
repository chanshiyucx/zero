import { env } from '@/env'
import { fetchData } from './fetch'

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
const PER_PAGE = 100
const MIN_STARS = 5

const headers = new Headers({
  Authorization: `token ${env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
})

export async function getGithubUserData() {
  return fetchData<User>(`${GITHUB_API}/users/${USERNAME}`, headers)
}

export async function getGithubRepo() {
  return fetchData<Repository>(
    `${GITHUB_API}/repos/${USERNAME}/${REPO}`,
    headers,
  )
}

export async function getGithubRepositories() {
  try {
    const { public_repos } = await getGithubUserData()
    const pages = Math.ceil(public_repos / PER_PAGE)

    const repositories = await Promise.all(
      Array.from({ length: pages }, (_, i) =>
        fetchData<Repository[]>(
          `${GITHUB_API}/users/${USERNAME}/repos?per_page=${PER_PAGE}&page=${i + 1}`,
          headers,
        ),
      ),
    ).then((results) => results.flat())

    return repositories
      .filter((repo) => repo.stargazers_count > MIN_STARS)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error)
    return []
  }
}
