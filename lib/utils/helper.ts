export const delay = (time: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, time))

export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const createSeededRandom = (initialSeed: number = 1) => {
  let seed = initialSeed
  return () => {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }
}

export const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start }, (_, i) => start + i)

export const shuffle = <T>(arr: T[]): T[] => {
  let i = arr.length
  let j
  while (i) {
    j = Math.floor(Math.random() * i--)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export const formatTime = (timeInSeconds: number): string => {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
    return '0:00'
  }
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

export const isExternalLink = (url: string): boolean => /^https?:\/\//.test(url)
