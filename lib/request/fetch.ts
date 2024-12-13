const DEFAULT_REVALIDATE_TIME = 3600 // 1 hour

export async function fetchData<T>(
  url: string,
  headers: Headers,
  revalidate: number = DEFAULT_REVALIDATE_TIME,
): Promise<T> {
  const response = await fetch(url, {
    headers,
    next: {
      revalidate,
    },
  })

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`)
  }

  return await response.json()
}
