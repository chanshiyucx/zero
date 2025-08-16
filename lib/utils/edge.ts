export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const getAbsoluteUrl = (path: string) => {
  return `${host}${path}`
}
