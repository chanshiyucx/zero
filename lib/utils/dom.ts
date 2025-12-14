import { isServerSide } from './env'

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

export const getIsMobile = (breakpoint = 768): boolean => {
  if (isServerSide) return false

  const isSmallScreen = window.innerWidth <= breakpoint
  const hasTouchSupport =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    'msMaxTouchPoints' in navigator

  return isSmallScreen && hasTouchSupport
}

export const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(console.error)
  } else {
    document.exitFullscreen?.().catch(console.error)
  }
}
