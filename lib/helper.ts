export const delay = <T>(time: number): Promise<T> =>
  new Promise((r) => setTimeout(r, time))

export const random = (a: number, b: number) =>
  Math.floor(Math.random() * (b - a) + a)

export const shuffle = <T>(arr: T[]): T[] => {
  let i = arr.length
  let j
  while (i) {
    j = Math.floor(Math.random() * i--)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
