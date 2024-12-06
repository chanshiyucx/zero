import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    GITHUB_TOKEN: z.string().startsWith('ghp_'),
    WAKATIME_API_KEY: z.string().startsWith('waka_'),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },
  client: {},
  experimental__runtimeEnv: {},
})
