export {}

declare global {
  interface Document {
    startViewTransition(callback?: () => void | Promise<void>): ViewTransition
  }
}
