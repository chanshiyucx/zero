export const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start }, (_, i) => start + i)

export const formatTime = (timeInSeconds: number): string => {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) {
    return '0:00'
  }
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
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
