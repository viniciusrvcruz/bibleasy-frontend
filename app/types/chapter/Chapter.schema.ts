import { z } from 'zod'
import { BookNameEnum } from '../book/Book.enum'
import { bookSchema } from '../book/Book.schema'
import { VersionSchema } from '../version/Version.schema'
import { verseSchema } from '../verse/Verse.schema'

export const chapterBaseSchema = z.object({
  id: z.int(),
  number: z.int(),
  position: z.int(),
})

export const chapterSchema = chapterBaseSchema.extend({
  verses_count: z.int().optional(),
  book: bookSchema.optional(),
  version: VersionSchema.optional(),
  verses: z.array(verseSchema).optional(),
  previous: chapterBaseSchema.nullable().optional(),
  next: chapterBaseSchema.nullable().optional(),
})

export const chapterSelectionSchema = z.object({
  book: z.enum(BookNameEnum),
  chapter: z.number().int().positive(),
})
