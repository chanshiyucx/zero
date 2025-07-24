import { env } from '@/env'
import type { ContentType } from '@/lib/utils/content'
import { APIError, fetchData } from './fetch'

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

export interface Discussion {
  id: number
  number: number
  title: string
  html_url: string
  comments: number
  labels: { name: string }[]
}

const GITHUB_API = 'https://api.github.com'
const USERNAME = 'chanshiyucx'
const CODE_REPO = 'zero'

const DISCUSSION_REPO = 'blog'
const DISCUSSION_REPO_ID = 'R_kgDOCP9Avw'
const DISCUSSION_CATEGORY_ID = 'DIC_kwDOCP9Av84Cl0Wb'
const DISCUSSION_LABEL_IDS = {
  Post: 'LA_kwDOCP9Av88AAAAB20f9KA',
  Note: 'LA_kwDOCP9Av88AAAAB20f-sQ',
  Leetcode: 'LA_kwDOCP9Av88AAAAB20gAmQ',
  Polyglot: 'LA_kwDOCP9Av88AAAAB3hXPdQ',
}

const headers = new Headers({
  Authorization: `Bearer ${env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v4+json',
})

export function getGithubUserData() {
  return fetchData<User>(`${GITHUB_API}/users/${USERNAME}`, headers)
}

export function getGithubRepo() {
  return fetchData<Repository>(
    `${GITHUB_API}/repos/${USERNAME}/${CODE_REPO}`,
    headers,
  )
}

export async function getGithubRepositories() {
  try {
    const perPage = 100
    const minStars = 5
    const { public_repos } = await getGithubUserData()
    const pages = Math.ceil(public_repos / perPage)

    const repositories = await Promise.all(
      Array.from({ length: pages }, (_, i) =>
        fetchData<Repository[]>(
          `${GITHUB_API}/users/${USERNAME}/repos?per_page=${perPage}&page=${i + 1}`,
          headers,
        ),
      ),
    ).then((results) => results.flat())

    return repositories
      .filter((repo) => repo.stargazers_count > minStars)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error)
    throw new Error('Failed to fetch GitHub repositories')
  }
}

export function getDiscussions() {
  return fetchData<Discussion[]>(
    `${GITHUB_API}/repos/${USERNAME}/${DISCUSSION_REPO}/discussions`,
    headers,
    0,
  )
}

export async function createDiscussion(
  title: string,
  label: ContentType,
): Promise<Discussion> {
  try {
    const createDiscussionQuery = `mutation {
      createDiscussion(input: {
        repositoryId: "${DISCUSSION_REPO_ID}",
        title: "${title}",
        body: "# ${title}",
        categoryId: "${DISCUSSION_CATEGORY_ID}"
      }) {
        discussion {
          id
          number
          title
          url
        }
      }
    }`

    const response = await fetch(`${GITHUB_API}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: createDiscussionQuery }),
    })
    if (!response.ok) {
      throw new APIError(response.status, response.statusText)
    }
    const result = await response.json()
    const discussion = result.data.createDiscussion.discussion
    discussion.html_url = discussion.url

    const addLabelQuery = `
      mutation {
        addLabelsToLabelable(input: {
          labelableId: "${result.data.createDiscussion.discussion.id}",
          labelIds: ["${DISCUSSION_LABEL_IDS[label]}"]
        }) {
          clientMutationId
        }
      }
    `

    await fetch(`${GITHUB_API}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: addLabelQuery }),
    })

    return discussion
  } catch (error: unknown) {
    if (error instanceof APIError) throw error
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`)
    }
    throw new Error('Failed to create discussion')
  }
}
