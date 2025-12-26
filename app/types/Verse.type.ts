import { z } from 'zod'
import type { VerseSchema } from './schemas/Verse.schema'

export type VerseSelection = z.infer<typeof VerseSchema>
