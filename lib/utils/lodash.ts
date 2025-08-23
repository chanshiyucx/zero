interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}

export const debounce = <T, A extends unknown[], R>(
  func: (this: T, ...args: A) => R,
  wait: number,
  immediate = false,
): ((this: T, ...args: A) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function (this: T, ...args: A) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    const later = () => {
      timeoutId = undefined
      if (!immediate) func.apply(context, args)
    }

    const shouldCallNow = immediate && timeoutId === undefined
    clearTimeout(timeoutId)
    timeoutId = setTimeout(later, wait)

    if (shouldCallNow) func.apply(context, args)
  }
}

export const throttle = <T, A extends unknown[], R>(
  func: (this: T, ...args: A) => R,
  wait: number,
  { leading = true, trailing = true }: ThrottleOptions = {},
): ((this: T, ...args: A) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let lastTime = 0

  const invoke = (context: T, args: A) => {
    func.apply(context, args)
    lastTime = Date.now()
  }

  return function (this: T, ...args: A) {
    const now = Date.now()
    const remaining = wait - (now - lastTime)

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = undefined
      }
      lastTime = now
      invoke(this, args)
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(() => {
        lastTime = leading ? Date.now() : 0
        timeoutId = undefined
        invoke(this, args)
      }, remaining)
    }
  }
}
