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

    const response = await fetch(url, {
      headers,
      next: { revalidate },
      signal: controller.signal,
    })

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
