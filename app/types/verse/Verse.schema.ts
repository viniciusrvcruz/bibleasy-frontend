import { z } from 'zod'
import { BookAbbreviation } from '~/utils/book'
import { verseReferenceSchema } from '../verseReference/VerseReference.schema'

export const verseSchema = z.object({
  id: z.int(),
  number: z.int(),
  text: z.string(),
  references: z.array(verseReferenceSchema).optional(),
})

export const verseSelectionSchema = z.object({
  book: z.enum(BookAbbreviation),
  chapter: z.number().int().positive(),
  verse: z.number().int().positive(),
})
