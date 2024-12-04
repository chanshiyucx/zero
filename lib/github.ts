import type { Repository, User } from '@/type/github'
import { env } from '@/env'

const GITHUB_API = 'https://api.github.com'
const USERNAME = 'chanshiyucx'
const REPO = 'zero'

const headers = new Headers({
  Authorization: `token ${env.GITHUB_TOKEN}`,
})

export async function getGithubUserData() {
  const response = await fetch(`${GITHUB_API}/users/${USERNAME}`, { headers })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const result: User = await response.json()
  return result
}

export async function getGithubRepositories() {
  const { public_repos: reposNumber } = await getGithubUserData()
  const numberOfPages = Math.ceil(reposNumber / 100)
  const repositories: Repository[] = []
  for (let index = 1; index <= numberOfPages; index++) {
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
  return repositories
}

export async function getGithubRepo() {
  const response = await fetch(`${GITHUB_API}/repos/${USERNAME}/${REPO}`, {
    headers,
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const result: Repository = await response.json()
  return result
}
