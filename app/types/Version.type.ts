import { z } from 'zod'
import { VersionSchema } from './schemas/Version.schema'

export type Version = z.infer<typeof VersionSchema>

