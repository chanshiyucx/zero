import { cacheLife, cacheTag, revalidateTag } from 'next/cache'
import { env } from '@/env'
import { APIError, fetchData } from './fetch'

const CACHE_TAGS = {
  githubRepos: 'github-repos',
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

type DiscussionCore = Pick<
  Discussion,
  'id' | 'number' | 'title' | 'url' | 'body'
>

type GraphQLResponse<T> = {
  data?: T
  errors?: { message: string }[]
}

type CreateDiscussionResult = {
  createDiscussion: {
    discussion: DiscussionCore
  }
}

type UpdateDiscussionResult = {
  updateDiscussion: {
    discussion: DiscussionCore
  }
}

type DiscussionSearchNode = DiscussionCore & {
  comments: {
    totalCount: number
  }
  labels: {
    nodes: Discussion['labels']
  }
}

type SearchDiscussionResult = {
  search: {
    nodes: DiscussionSearchNode[]
  }
}

const GITHUB_API = 'https://api.github.com'
const USERNAME = 'chanshiyucx'

const DISCUSSION_REPO = 'blog'
const DISCUSSION_REPO_ID = 'R_kgDOCP9Avw'
const DISCUSSION_CATEGORY_ID = 'DIC_kwDOCP9Av84Cl0Wb'
export const DISCUSSION_LABELS = [
  'craft',
  'journal',
  'musing',
  'album',
] as const

export type DiscussionLabel = (typeof DISCUSSION_LABELS)[number]

const DISCUSSION_LABEL_IDS: Record<DiscussionLabel, string> = {
  craft: 'LA_kwDOCP9Av88AAAAB20f9KA',
  journal: 'LA_kwDOCP9Av88AAAACK_lFRA',
  musing: 'LA_kwDOCP9Av88AAAACaKdyyg',
  album: 'LA_kwDOCP9Av88AAAACcgitDA',
}

const headers = new Headers({
  Authorization: `Bearer ${env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v4+json',
})

const getDiscussionTag = (title: string, label: string) =>
  `github-discussion:${encodeURIComponent(label)}:${encodeURIComponent(title)}`

const isDiscussionLabel = (label: string): label is DiscussionLabel =>
  Object.hasOwn(DISCUSSION_LABEL_IDS, label)

const assertDiscussionLabel = (label: string): DiscussionLabel => {
  if (!isDiscussionLabel(label)) {
    throw new APIError(400, 'Invalid discussion label')
  }

  return label
}

const normalizeDiscussion = (
  discussion: DiscussionCore & Partial<Pick<Discussion, 'comments' | 'labels'>>,
): Discussion => ({
  ...discussion,
  html_url: discussion.url,
  node_id: discussion.id,
  comments: discussion.comments ?? 0,
  labels: discussion.labels ?? [],
})

async function fetchGithubGraphQL<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const result = await fetchData<GraphQLResponse<T>>(`${GITHUB_API}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join('; '))
  }

  if (!result.data) {
    throw new Error('GitHub GraphQL returned no data')
  }

  return result.data
}

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

const SEARCH_DISCUSSION_QUERY = `
  query SearchDiscussion($query: String!) {
    search(query: $query, type: DISCUSSION, first: 10) {
      nodes {
        ... on Discussion {
          id
          number
          title
          url
          body
          comments {
            totalCount
          }
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
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

export async function getDiscussion(title: string, label: string) {
  'use cache'
  cacheLife(CACHE_LIFES.minutes)
  cacheTag(getDiscussionTag(title, label))

  assertDiscussionLabel(label)

  const searchTitle = title.replaceAll('"', '\\"')
  const query = `repo:${USERNAME}/${DISCUSSION_REPO} in:title "${searchTitle}"`

  const result = await fetchGithubGraphQL<SearchDiscussionResult>(
    SEARCH_DISCUSSION_QUERY,
    { query },
  )

  const discussion = result.search.nodes.find(
    (item) =>
      item.title === title && item.labels.nodes.some((l) => l.name === label),
  )

  if (!discussion) return null

  return normalizeDiscussion({
    id: discussion.id,
    number: discussion.number,
    title: discussion.title,
    url: discussion.url,
    comments: discussion.comments.totalCount,
    body: discussion.body,
    labels: discussion.labels.nodes,
  })
}

export async function createDiscussion(
  title: string,
  label: string,
  body: string,
): Promise<Discussion> {
  try {
    const discussionLabel = assertDiscussionLabel(label)
    const existingDiscussion = await getDiscussion(title, discussionLabel)
    if (existingDiscussion) {
      return existingDiscussion
    }

    const result = await fetchGithubGraphQL<CreateDiscussionResult>(
      CREATE_DISCUSSION_MUTATION,
      {
        repositoryId: DISCUSSION_REPO_ID,
        title,
        body,
        categoryId: DISCUSSION_CATEGORY_ID,
      },
    )

    const discussion = normalizeDiscussion(result.createDiscussion.discussion)
    const labelId = DISCUSSION_LABEL_IDS[discussionLabel]

    await fetchGithubGraphQL(ADD_LABELS_MUTATION, {
      labelableId: discussion.id,
      labelIds: [labelId],
    })

    revalidateTag(getDiscussionTag(title, label), { expire: 0 })

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
  title: string,
  label: string,
  body: string,
): Promise<Discussion> {
  try {
    const discussionLabel = assertDiscussionLabel(label)
    const currentDiscussion = await getDiscussion(title, discussionLabel)

    if (!currentDiscussion) {
      throw new APIError(404, 'Discussion not found')
    }

    if (currentDiscussion.node_id !== discussionId) {
      throw new APIError(409, 'Discussion id mismatch')
    }

    const result = await fetchGithubGraphQL<UpdateDiscussionResult>(
      UPDATE_DISCUSSION_MUTATION,
      { discussionId, body },
    )

    const discussion = normalizeDiscussion(result.updateDiscussion.discussion)

    revalidateTag(getDiscussionTag(title, label), { expire: 0 })

    return discussion
  } catch (error: unknown) {
    if (error instanceof APIError) throw error
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`)
    }
    throw new Error('Failed to update discussion body')
  }
}
