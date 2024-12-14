export const debounce = <F extends (...args: unknown[]) => unknown>(
  func: F,
  wait: number,
  immediate = false,
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function (this: unknown, ...args: Parameters<F>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    const doLater = () => {
      timeoutId = undefined
      if (!immediate) {
        func.apply(context, args)
      }
    }

    const shouldCallNow = immediate && timeoutId === undefined

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(doLater, wait)

    if (shouldCallNow) {
      func.apply(context, args)
    }
  }
}

export const throttle = <F extends (...args: unknown[]) => unknown>(
  func: F,
  wait: number,
  options: {
    leading?: boolean
    trailing?: boolean
  } = {},
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let lastArgs: Parameters<F> | undefined
  let lastCallTime: number | undefined

  const doLater = () => {
    timeoutId = undefined
    if (lastArgs !== undefined) {
      func.apply(this, lastArgs)
      lastArgs = undefined
      lastCallTime = Date.now()
      timeoutId = setTimeout(doLater, wait)
    }
  }

  return function (this: never, ...args: Parameters<F>) {
    const currentTime = Date.now()

    if (lastCallTime === undefined && options.leading === false) {
      lastCallTime = currentTime
    }

    const remainingTime = wait - (currentTime - (lastCallTime ?? 0))

    if (remainingTime <= 0 || remainingTime > wait) {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }
      func.apply(this, args)
      lastCallTime = currentTime
      timeoutId = setTimeout(doLater, wait)
    } else if (options.trailing !== false) {
      lastArgs = args
      if (timeoutId === undefined) {
        timeoutId = setTimeout(doLater, remainingTime)
      }
    }
  }
}
