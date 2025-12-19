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
  options: RequestInit,
): Promise<T> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)

    options.signal = controller.signal

    const response = await fetch(url, options)

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new APIError(response.status, response.statusText)
    }

    return (await response.json()) as T
  } catch (error: unknown) {
    if (error instanceof APIError) throw error
    if (error instanceof Error) {
      throw new Error(`Fetch error: ${error.message}`)
    }
    throw new Error('Unknown fetch error occurred')
  }
}
