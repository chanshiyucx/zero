export const transitionViewIfSupported = (updateCb: () => void) => {
  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    updateCb()
    return
  }

  document.startViewTransition(updateCb)
}
