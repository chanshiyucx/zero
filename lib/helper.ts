export const delay = <T>(time: number): Promise<T> =>
  new Promise((r) => setTimeout(r, time))

export const random = (start: number, end: number): number =>
  Math.floor(Math.random() * (end - start) + start)

export const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start }, (_, k) => k + start)

export const shuffle = <T>(arr: T[]): T[] => {
  let i = arr.length
  let j
  while (i) {
    j = Math.floor(Math.random() * i--)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
