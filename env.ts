import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    GITHUB_TOKEN: z.string().startsWith('ghp_'),
  },
  experimental__runtimeEnv: process.env,
})
