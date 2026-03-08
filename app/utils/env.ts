import { z } from 'zod'

const envSchema = z.object({
  NUXT_PUBLIC_API_BASE_URL: z.url(),
  NUXT_API_BASE_URL: z.url().optional(),
  NUXT_API_KEY: z.string(),
  NUXT_PUBLIC_DEFAULT_VERSION_ABBREVIATION: z.string().optional(),
})

export const env = envSchema.parse(import.meta.env)
