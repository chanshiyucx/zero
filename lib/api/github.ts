import { env } from '@/env'
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
  url: string
  comments: number
  labels: { name: string }[]
}

interface DiscussionResult {
  data: {
    createDiscussion: {
      discussion: Discussion
    }
  }
}

export interface ContributionDay {
  color: string
  contributionCount: number
  date: string
}

interface ContributionDays {
  contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionDays[]
}

interface ContributionResult {
  data: {
    viewer: {
      contributionsCollection: {
        contributionCalendar: ContributionCalendar
      }
    }
  }
}

const GITHUB_API = 'https://api.github.com'
const USERNAME = 'chanshiyucx'
const CODE_REPO = 'zero'

const DISCUSSION_REPO = 'blog'
const DISCUSSION_REPO_ID = 'R_kgDOCP9Avw'
const DISCUSSION_CATEGORY_ID = 'DIC_kwDOCP9Av84Cl0Wb'
const DISCUSSION_LABEL_IDS = {
  post: 'LA_kwDOCP9Av88AAAAB20f9KA',
  note: 'LA_kwDOCP9Av88AAAAB20f-sQ',
  leetcode: 'LA_kwDOCP9Av88AAAAB20gAmQ',
  polyglot: 'LA_kwDOCP9Av88AAAAB3hXPdQ',
}

const headers = new Headers({
  Authorization: `Bearer ${env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v4+json',
})

export function getGithubUserData() {
  return fetchData<User>(`${GITHUB_API}/users/${USERNAME}`, {
    headers,
    next: { revalidate: 3600 },
  })
}

export function getGithubRepo() {
  return fetchData<Repository>(`${GITHUB_API}/repos/${USERNAME}/${CODE_REPO}`, {
    headers,
    next: { revalidate: 3600 },
  })
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
          { headers, next: { revalidate: 3600 } },
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
    { headers },
  )
}

export async function createDiscussion(
  title: string,
  label: string,
): Promise<Discussion> {
  try {
    const createDiscussionQuery = `
      mutation CreateDiscussion($repositoryId: ID!, $title: String!, $body: String!, $categoryId: ID!) {
        createDiscussion(input: {
          repositoryId: $repositoryId,
          title: $title,
          body: $body,
          categoryId: $categoryId
        }) {
          discussion {
            id
            number
            title
            url
          }
        }
      }
    `

    const createDiscussionVariables = {
      repositoryId: DISCUSSION_REPO_ID,
      title: title,
      body: `# ${title}`,
      categoryId: DISCUSSION_CATEGORY_ID,
    }

    const result = await fetchData<DiscussionResult>(`${GITHUB_API}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: createDiscussionQuery,
        variables: createDiscussionVariables,
      }),
    })
    const discussion = result.data.createDiscussion.discussion
    discussion.html_url = discussion.url
    const labelIds =
      DISCUSSION_LABEL_IDS[label as keyof typeof DISCUSSION_LABEL_IDS]

    const addLabelQuery = `
      mutation AddLabels($labelableId: ID!, $labelIds: [ID!]!) {
        addLabelsToLabelable(input: {
          labelableId: $labelableId,
          labelIds: $labelIds
        }) {
          clientMutationId
        }
      }
    `
    const addLabelVariables = {
      labelableId: result.data.createDiscussion.discussion.id,
      labelIds: [labelIds],
    }

    await fetchData(`${GITHUB_API}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: addLabelQuery,
        variables: addLabelVariables,
      }),
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

export async function getContribution(
  from: string,
  to: string,
): Promise<ContributionCalendar> {
  try {
    const getContributionQuery = `
      query GetContributions($from: DateTime!, $to: DateTime!) {
        viewer {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  color
                  date
                }
              }
            }
          }
        }
      }
    `

    const result = await fetchData<ContributionResult>(
      `${GITHUB_API}/graphql`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: getContributionQuery,
          variables: { from, to },
        }),
        next: { revalidate: 3600 * 6 },
      },
    )
    const contributionCalendar =
      result.data.viewer.contributionsCollection.contributionCalendar
    return contributionCalendar
  } catch (error) {
    if (error instanceof APIError) throw error
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`)
    }
    throw new Error('Failed to get contribution')
  }
}
