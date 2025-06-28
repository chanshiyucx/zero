const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Executes a view transition if supported by the browser and not disabled by user preferences
 * @param updateCb - Callback function that updates the DOM
 */
export const transitionViewIfSupported = (updateCb: () => void): void => {
  if (!document.startViewTransition || prefersReducedMotion()) {
    updateCb()
    return
  }

  document.startViewTransition(updateCb)
}
