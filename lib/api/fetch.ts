const DEFAULT_REVALIDATE_TIME = 3600 // 1 hour
const DEFAULT_TIMEOUT = 10000 // 10 seconds

export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export async function fetchData<T>(
  url: string,
  headers: Headers,
  revalidate: number = DEFAULT_REVALIDATE_TIME,
): Promise<T> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)

    const options: RequestInit = {
      headers,
      signal: controller.signal,
      cache: revalidate === 0 ? 'no-store' : 'force-cache',
    }

    if (revalidate > 0) {
      options.next = { revalidate }
    }

    const response = await fetch(url, options)

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new APIError(response.status, response.statusText)
    }

    return await response.json()
  } catch (error: unknown) {
    if (error instanceof APIError) throw error
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`)
    }
    throw new Error('Unknown fetch error occurred')
  }
}
