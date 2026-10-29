const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type TransitionViewOptions = {
  onFinish?: () => void
  onStart?: () => void
}

/**
 * Executes a view transition if supported by the browser and not disabled by user preferences
 * @param updateCb - Callback function that updates the DOM
 * @returns The started transition, or undefined when the DOM was updated directly
 */
export const transitionViewIfSupported = (
  updateCb: () => Promise<void> | void,
  options?: TransitionViewOptions,
): ViewTransition | undefined => {
  if (!document.startViewTransition || prefersReducedMotion()) {
    void updateCb()
    return
  }

  options?.onStart?.()
  const transition = document.startViewTransition(updateCb)
  // `ready` rejects whenever the animation is skipped, while the DOM update
  // still lands; update failures keep surfacing through `finished`
  transition.ready.catch(() => {})
  void transition.finished.finally(options?.onFinish)
  return transition
}

/**
 * Jumps the entrance animations inside `container` to their final frame. An
 * entrance is any CSS animation whose keyframes are named `enter-*`.
 */
export const finishEntrance = (container: Element): void => {
  container.getAnimations({ subtree: true }).forEach((animation) => {
    if (
      animation instanceof CSSAnimation &&
      animation.animationName.startsWith('enter-')
    ) {
      animation.finish()
    }
  })
}

export const isInViewport = (element: Element): boolean => {
  const { top, bottom } = element.getBoundingClientRect()
  return bottom > 0 && top < window.innerHeight
}
