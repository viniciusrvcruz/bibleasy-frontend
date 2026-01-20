import { z } from 'zod'
import { verseReferenceSchema } from './VerseReference.schema'

export type VerseReference = z.infer<typeof verseReferenceSchema>