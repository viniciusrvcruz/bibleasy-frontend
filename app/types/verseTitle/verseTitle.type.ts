import { z } from 'zod'
import { verseTitleSchema } from './verseTitle.schema'

export type VerseTitle = z.infer<typeof verseTitleSchema>
