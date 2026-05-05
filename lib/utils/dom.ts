const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type TransitionViewOptions = {
  onFinish?: () => void
  onStart?: () => void
}

/**
 * Executes a view transition if supported by the browser and not disabled by user preferences
 * @param updateCb - Callback function that updates the DOM
 */
export const transitionViewIfSupported = (
  updateCb: () => Promise<void> | void,
  options?: TransitionViewOptions,
): void => {
  if (!document.startViewTransition || prefersReducedMotion()) {
    void updateCb()
    return
  }

  options?.onStart?.()
  document.startViewTransition(updateCb).finished.finally(options?.onFinish)
}

export const getArticleTitleTransitionName = (slug: string): string =>
  `article-title-${slug.replace(/[^a-zA-Z0-9_-]/g, '-')}`
