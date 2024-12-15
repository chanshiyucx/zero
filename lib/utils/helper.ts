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
