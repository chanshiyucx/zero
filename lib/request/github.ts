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

const headers = new Headers({
  Authorization: `token ${env.GITHUB_TOKEN}`,
})

export async function getGithubUserData() {
  const url = `${GITHUB_API}/users/${USERNAME}`
  return fetchData<User>(url, headers)
}

export async function getGithubRepositories() {
  const { public_repos } = await getGithubUserData()
  const pages = Math.ceil(public_repos / 100)
  let repositories: Repository[] = []
  for (let index = 1; index <= pages; index++) {
    const url = `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&page=${index}`
    const list = await fetchData<Repository[]>(url, headers)
    repositories.push(...list)
  }
  // Filter and sort
  repositories = repositories.filter((repo) => repo.stargazers_count > 5)
  repositories.sort((a, b) => b.stargazers_count - a.stargazers_count)
  return repositories
}

export async function getGithubRepo() {
  const url = `${GITHUB_API}/repos/${USERNAME}/${REPO}`
  return fetchData<Repository>(url, headers)
}
