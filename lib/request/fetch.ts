import type { Lanyard } from './discord'
import type { Repository, User } from './github'
import type { Wakatime } from './waka-time'

const CACHE_TTL = 10 * 60 * 1000

interface Cache<T> {
  data: T | null
  timestamp: number
}

interface CacheStructure {
  repositories: Cache<Repository[]>
  repository: Cache<Repository>
  user: Cache<User>
  wakatime: Cache<Wakatime>
  discord: Cache<Lanyard>
}

const cache: CacheStructure = {
  repositories: { data: null, timestamp: 0 },
  repository: { data: null, timestamp: 0 },
  user: { data: null, timestamp: 0 },
  wakatime: { data: null, timestamp: 0 },
  discord: { data: null, timestamp: 0 },
}

export function getCache<Key extends keyof CacheStructure>(
  key: Key,
  ttl: number = CACHE_TTL,
): CacheStructure[Key]['data'] | null {
  const now = Date.now()
  const { data, timestamp } = cache[key]
  const isValid = data && now - timestamp < ttl
  return isValid ? data : null
}

export function setCache<Key extends keyof CacheStructure>(
  key: Key,
  data: CacheStructure[Key]['data'],
): void {
  cache[key].data = data
  cache[key].timestamp = Date.now()
}

export async function fetchWithCache<Key extends keyof CacheStructure>(
  url: string,
  cacheKey: Key,
  headers: Headers,
  ttl?: number,
): Promise<NonNullable<CacheStructure[Key]['data']>> {
  const cachedData = getCache(cacheKey, ttl)
  if (cachedData) return cachedData

  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`)
  }

  const data = await response.json()
  setCache(cacheKey, data)
  return data
}
