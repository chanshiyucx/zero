import { siteConfig } from '@/lib/constants/config'
import { isProd } from '@/lib/utils/env'

const baseUrl = isProd ? siteConfig.host : 'http://localhost:3000'

export const getAbsoluteUrl = (path: string) => {
  return `${baseUrl}${path}`
}
