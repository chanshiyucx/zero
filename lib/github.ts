import type {
  Commit,
  ContributionDay,
  Follower,
  Repo,
  Repository,
  User,
  Week,
} from '@/type/github'
import { add, sub } from 'date-fns'
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

export async function getGithubCommits() {
  const response = await fetch(
    `${GITHUB_API}/search/commits?q=author:${USERNAME}`,
    { headers },
  )
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const result: Commit = await response.json()
  return result
}

export async function getGithubFollowers() {
  const { followers: followersNumber } = await getGithubUserData()
  const numberOfPages = Math.ceil(followersNumber / 100)

  const followers: Follower[] = []
  for (let index = 1; index <= numberOfPages; index++) {
    const response = await fetch(
      `${GITHUB_API}/users/${USERNAME}/followers?per_page=100&page=${index}`,
      { headers },
    )
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const list: Follower[] = await response.json()
    followers.push(...list)
  }
  return followers
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
  const result: Repo = await response.json()
  return result
}

// Function to calculate the productive data by days
function calculateMostProductiveDayOfWeek(contributionCalendar: {
  weeks: Week[]
}): { day: string; count: number }[] {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const contributionCountByDayOfWeek: {
    [day: string]: number
  } = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  }

  for (const week of contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      const date = new Date(day.date)
      const dayOfWeek = daysOfWeek[date.getUTCDay()]
      contributionCountByDayOfWeek[dayOfWeek] += day.contributionCount
    }
  }

  const sortedData = Object.entries(contributionCountByDayOfWeek)
    .sort((a, b) => daysOfWeek.indexOf(a[0]) - daysOfWeek.indexOf(b[0]))
    .map(([day, count]) => ({ day, count }))

  const sunday = sortedData.shift()
  if (sunday) {
    sortedData.push(sunday)
  }
  return sortedData
}

export async function getGithubContribution() {
  const now = new Date()
  const from = sub(now, { days: 30 })
  // also include the next day in case our server is behind in time with respect to GitHub
  const to = add(now, { days: 1 })
  const query = {
    query: `
      query userInfo($LOGIN: String!, $FROM: DateTime!, $TO: DateTime!) {
        user(login: $LOGIN) {
          name
          contributionsCollection(from: $FROM, to: $TO) {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      LOGIN: USERNAME,
      FROM: from.toISOString(),
      TO: to.toISOString(),
    },
  }

  const response = await fetch(`${GITHUB_API}/graphql`, {
    method: 'POST',
    body: JSON.stringify(query),
    headers,
  })
  const result = await response.json()
  const userData: {
    contributions: ContributionDay[]
    name: string
  } = {
    contributions: [],
    name: result.data.user.name,
  }

  const weeks =
    result.data.user.contributionsCollection.contributionCalendar.weeks
  weeks.map((week: Week) =>
    week.contributionDays.map((contributionDay: ContributionDay) => {
      contributionDay.shortDate = new Date(contributionDay.date)
        .getDate()
        .toString()
      userData.contributions.push(contributionDay)
    }),
  )

  const contributionCountByDayOfWeek = calculateMostProductiveDayOfWeek(
    result.data.user.contributionsCollection.contributionCalendar,
  )

  return { ...userData, contributionCountByDayOfWeek }
}
