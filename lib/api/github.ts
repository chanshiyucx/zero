import { cacheLife, cacheTag, revalidateTag } from 'next/cache'
import { env } from '@/env'
import { APIError, fetchData } from './fetch'

const CACHE_TAGS = {
  githubRepos: 'github-repos',
  githubDiscussions: 'github-discussions',
} as const

const CACHE_LIFES = {
  minutes: 'minutes',
  hours: 'hours',
  days: 'days',
  weeks: 'weeks',
  max: 'max',
} as const

type User = {
  followers: number
  public_repos: number
}

export type Repository = {
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

export type Discussion = {
  number: number
  id: string
  node_id: string
  title: string
  html_url: string
  url: string
  comments: number
  body: string
  labels: { name: string }[]
}

type CreateDiscussionResult = {
  data: {
    createDiscussion: {
      discussion: Discussion
    }
  }
}

type UpdateDiscussionResult = {
  data: {
    updateDiscussion: {
      discussion: Discussion
    }
  }
}

const GITHUB_API = 'https://api.github.com'
const USERNAME = 'chanshiyucx'

const DISCUSSION_REPO = 'blog'
const DISCUSSION_REPO_ID = 'R_kgDOCP9Avw'
const DISCUSSION_CATEGORY_ID = 'DIC_kwDOCP9Av84Cl0Wb'
const DISCUSSION_LABEL_IDS = {
  craft: 'LA_kwDOCP9Av88AAAAB20f9KA',
  journal: 'LA_kwDOCP9Av88AAAACK_lFRA',
}

const headers = new Headers({
  Authorization: `Bearer ${env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v4+json',
})

const CREATE_DISCUSSION_MUTATION = `
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
        body
      }
    }
  }
`

const ADD_LABELS_MUTATION = `
  mutation AddLabels($labelableId: ID!, $labelIds: [ID!]!) {
    addLabelsToLabelable(input: {
      labelableId: $labelableId,
      labelIds: $labelIds
    }) {
      clientMutationId
    }
  }
`

const UPDATE_DISCUSSION_MUTATION = `
  mutation UpdateDiscussion($discussionId: ID!, $body: String!) {
    updateDiscussion(input: {
      discussionId: $discussionId,
      body: $body
    }) {
      discussion {
        id
        number
        title
        url
        body
      }
    }
  }
`

async function getGithubUserData() {
  return fetchData<User>(`${GITHUB_API}/users/${USERNAME}`, {
    headers,
  })
}

export async function getGithubRepositories() {
  'use cache'
  cacheLife(CACHE_LIFES.hours)
  cacheTag(CACHE_TAGS.githubRepos)

  try {
    const perPage = 100
    const minStars = 10
    const { public_repos } = await getGithubUserData()
    const pages = Math.ceil(public_repos / perPage)

    const repositories = await Promise.all(
      Array.from({ length: pages }, (_, i) =>
        fetchData<Repository[]>(
          `${GITHUB_API}/users/${USERNAME}/repos?per_page=${perPage}&page=${i + 1}`,
          { headers },
        ),
      ),
    ).then((results) => results.flat())

    return repositories
      .filter((repo) => repo.stargazers_count > minStars)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new Error(
      `Failed to fetch GitHub repositories: ${(error as Error).message}`,
    )
  }
}

export async function getDiscussions() {
  'use cache'
  cacheLife(CACHE_LIFES.minutes)
  cacheTag(CACHE_TAGS.githubDiscussions)

  return fetchData<Discussion[]>(
    `${GITHUB_API}/repos/${USERNAME}/${DISCUSSION_REPO}/discussions`,
    { headers },
  )
}

export async function createDiscussion(
  title: string,
  label: string,
  body: string,
): Promise<Discussion> {
  try {
    const result = await fetchData<CreateDiscussionResult>(
      `${GITHUB_API}/graphql`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: CREATE_DISCUSSION_MUTATION,
          variables: {
            repositoryId: DISCUSSION_REPO_ID,
            title,
            body,
            categoryId: DISCUSSION_CATEGORY_ID,
          },
        }),
      },
    )

    const discussion = result.data.createDiscussion.discussion
    discussion.html_url = discussion.url
    discussion.node_id = discussion.id

    const labelId =
      DISCUSSION_LABEL_IDS[label as keyof typeof DISCUSSION_LABEL_IDS]

    await fetchData(`${GITHUB_API}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: ADD_LABELS_MUTATION,
        variables: {
          labelableId: discussion.id,
          labelIds: [labelId],
        },
      }),
    })

    revalidateTag(CACHE_TAGS.githubDiscussions, { expire: 0 })

    return discussion
  } catch (error: unknown) {
    if (error instanceof APIError) throw error
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`)
    }
    throw new Error('Failed to create discussion')
  }
}

export async function updateDiscussion(
  discussionId: string,
  body: string,
): Promise<Discussion> {
  try {
    const result = await fetchData<UpdateDiscussionResult>(
      `${GITHUB_API}/graphql`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: UPDATE_DISCUSSION_MUTATION,
          variables: { discussionId, body },
        }),
      },
    )

    const discussion = result.data.updateDiscussion.discussion
    discussion.html_url = discussion.url
    discussion.node_id = discussion.id

    revalidateTag(CACHE_TAGS.githubDiscussions, { expire: 0 })

    return discussion
  } catch (error: unknown) {
    if (error instanceof APIError) throw error
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`)
    }
    throw new Error('Failed to update discussion body')
  }
}
