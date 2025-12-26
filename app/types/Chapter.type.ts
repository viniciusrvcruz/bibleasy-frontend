import { z } from 'zod'
import type { ChapterSchema } from './schemas/Chapter.schema'

export type ChapterSelection = z.infer<typeof ChapterSchema>
