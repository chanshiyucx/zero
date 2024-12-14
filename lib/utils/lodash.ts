type AnyFunction = (...args: unknown[]) => unknown

interface ThrottleOptions {
  leading?: boolean
  trailing?: boolean
}

export const debounce = <F extends AnyFunction>(
  func: F,
  wait: number,
  immediate = false,
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
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

export const throttle = <F extends AnyFunction>(
  func: F,
  wait: number,
  { leading = true, trailing = true }: ThrottleOptions = {},
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let lastTime = 0

  const invoke = (context: ThisParameterType<F>, args: Parameters<F>) => {
    func.apply(context, args)
    lastTime = Date.now()
  }

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const now = Date.now()
    const remaining = wait - (now - lastTime)

    if (remaining <= 0) {
      clearTimeout(timeoutId)
      timeoutId = undefined
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
